import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  DocumentData,
  Query,
  CollectionReference
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useCollection = (collectionName: string, conditions?: any[]) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Set a timeout to reduce loading time if Firebase takes too long
        timeoutId = setTimeout(() => {
          setError('Firebase connection timeout - using offline mode');
          setLoading(false);
        }, 3000); // 3 second timeout

        const baseQuery = collection(db, collectionName);
        let finalQuery: Query<DocumentData> | CollectionReference<DocumentData> = baseQuery;
        
        if (conditions) {
          const queryConstraints: any[] = [];
          conditions.forEach(condition => {
            if (condition.type === 'where') {
              queryConstraints.push(where(condition.field, condition.operator, condition.value));
            } else if (condition.type === 'orderBy') {
              queryConstraints.push(orderBy(condition.field, condition.direction));
            }
          });
          finalQuery = query(baseQuery, ...queryConstraints);
        }

        unsubscribe = onSnapshot(finalQuery, 
          (snapshot) => {
            clearTimeout(timeoutId);
            const docs = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setData(docs);
            setLoading(false);
            setError(null);
          },
          (err) => {
            clearTimeout(timeoutId);
            // Only log permission errors once and set a user-friendly error
            if (err.code === 'permission-denied') {
              setError('Firebase permissions not configured');
            } else {
              setError(err.message || 'Connection error');
            }
            setLoading(false);
            console.warn(`Firebase connection error for ${collectionName}:`, err.code);
          }
        );

      } catch (err) {
        clearTimeout(timeoutId);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        setLoading(false);
        console.warn(`Firebase setup error for ${collectionName}:`, errorMessage);
      }
    };

    fetchData();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (unsubscribe) unsubscribe();
    };
  }, [collectionName, JSON.stringify(conditions)]);

  return { data, loading, error };
};

export const useDocument = (collectionName: string, docId: string) => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!docId) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, collectionName, docId);
    
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setData({ id: doc.id, ...doc.data() });
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [collectionName, docId]);

  return { data, loading, error };
};

export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};