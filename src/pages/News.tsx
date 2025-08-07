import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, MessageSquare } from "lucide-react";
import { useCollection } from "@/hooks/useFirebase";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  published_at: any;
  createdAt: any;
}

export default function News() {
  const { data: news, loading } = useCollection('news', [
    { type: 'orderBy', field: 'published_at', direction: 'desc' }
  ]);

  // Sample news fallback
  const sampleNews: NewsArticle[] = [
    {
      id: '1',
      title: 'SRKR Tigers Win the Championship!',
      content: 'The SRKR Tigers clinched the title after a thrilling final match. Fans celebrated the victory with great enthusiasm.',
      image: '/placeholder.svg',
      author: 'Admin',
      category: 'Match Report',
      published_at: new Date(),
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Player of the Tournament Announced',
      content: 'Congratulations to Rohit Sharma for being named Player of the Tournament for his outstanding performance.',
      image: '/placeholder.svg',
      author: 'Admin',
      category: 'Awards',
      published_at: new Date(),
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Upcoming Fixtures Released',
      content: 'The fixtures for the next season have been released. Teams are gearing up for another exciting tournament.',
      image: '/placeholder.svg',
      author: 'Admin',
      category: 'Announcement',
      published_at: new Date(),
      createdAt: new Date(),
    },
  ];

  const displayNews = (news && news.length > 0) ? news : sampleNews;

  const formatDate = (date: any) => {
    if (!date) return 'Recently';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">Loading news...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cricket News</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with the latest cricket news and updates
          </p>
        </div>
        
        <Badge className="cricket-shadow text-lg px-4 py-2">
          <MessageSquare className="mr-2 h-5 w-5" />
          {news.length} Articles
        </Badge>
      </div>

      {/* Featured Article */}
      {displayNews.length > 0 && (
        <Card className="cricket-shadow">
          <div className="md:flex">
            {displayNews[0].image && (
              <div className="md:w-1/3">
                <img
                  src={displayNews[0].image}
                  alt={displayNews[0].title}
                  className="w-full h-48 md:h-full object-cover rounded-l-lg"
                />
              </div>
            )}
            <div className={`p-6 ${displayNews[0].image ? 'md:w-2/3' : 'w-full'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="destructive">Featured</Badge>
                {displayNews[0].category && (
                  <Badge variant="outline">{displayNews[0].category}</Badge>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-3">{displayNews[0].title}</h2>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {displayNews[0].content.substring(0, 200)}...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {displayNews[0].author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {displayNews[0].author}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(displayNews[0].published_at || displayNews[0].createdAt)}
                  </div>
                </div>
                {/* Removed Read More button */}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* News Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayNews.slice(1).map((article) => (
          <Card key={article.id} className="cricket-shadow hover:scale-105 transition-transform duration-200">
            {article.image && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
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
              {/* Removed Read Article button */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {displayNews.length > 6 && (
        <div className="text-center">
          <Button variant="outline" className="cricket-shadow">
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  );
}