import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, MessageSquare } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  published_at?: string | Date;
  createdAt?: string | Date;
}

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState(6);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/news`)
      .then(res => setNews(res.data))
      .catch(err => {
        console.error("Error fetching news:", err);
        setNews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date: any) => {
    if (!date) return "Recently";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const loadMore = () => {
    setVisibleArticles(prev => prev + 6);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const featuredItem = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  if (loading) {
    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">Loading news...</h2>
        </div>
        
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} variants={item}>
              <Card>
                <Skeleton className="aspect-video w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-6 bg-background min-h-screen text-gray-900 dark:bg-gray-900 dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Cricket News</h1>
            <p className="text-muted-foreground mt-2 dark:text-gray-300">
              Stay updated with the latest cricket news and updates
            </p>
          </div>

          <Badge className="text-lg px-4 py-2 bg-primary hover:bg-primary/90 shadow-md">
            <MessageSquare className="mr-2 h-5 w-5" />
            {news.length} Articles
          </Badge>
        </motion.div>

        {/* Featured Article */}
        <AnimatePresence>
          {news.length > 0 && (
            <motion.div
              variants={featuredItem}
              initial="hidden"
              animate="show"
            >
                <Card className="shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                <div className="md:flex">
                  {news[0].image && (
                    <motion.div 
                      className="md:w-1/3 overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <img
                        src={news[0].image}
                        alt={news[0].title}
                        className="w-full h-48 md:h-full object-cover rounded-l-lg hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  )}
                  <div className={`p-6 ${news[0].image ? "md:w-2/3" : "w-full"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive" className="animate-pulse">Featured</Badge>
                      {news[0].category && (
                        <Badge variant="outline">{news[0].category}</Badge>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{news[0].title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {news[0].content.substring(0, 200)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {news[0].author && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {news[0].author}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(news[0].published_at || news[0].createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* News Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {news.slice(1, visibleArticles).map((article) => (
              <motion.div 
                key={article._id}
                variants={item}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="shadow-md hover:shadow-lg transition-all bg-white dark:bg-gray-800">
                  {article.image && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <motion.img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      {article.category && (
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {article.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {article.author}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.published_at || article.createdAt)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {news.length > visibleArticles && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="outline" 
              onClick={loadMore}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Load More Articles
            </Button>
          </motion.div>
        )}
      {/* End of main content */}
    </motion.div>
  );
}