import { Clock, Tag, User } from 'lucide-react';
import { Article } from '@/lib/journal';

export default function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm font-sans tracking-widest uppercase text-zinc-400">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
        <span className="text-zinc-300">{article.publishedDate}</span>
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-gold/60" />
        <span>{article.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gold/60" />
        <span>{article.author}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-gold/60" />
        <span>{article.readingTime}</span>
      </div>
    </div>
  );
}
