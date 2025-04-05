import { getAllPostIds, getPostData } from '@/lib/posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

function TagsList({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map(tag => (
        <span key={tag} className="px-2 py-0.5 bg-background border border-foreground text-foreground text-xs">
          #{tag}
        </span>
      ))}
    </div>
  );
}

function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="text-sm text-muted-text ml-2">
      {minutes} min decode time
    </span>
  );
}

function PostNavigation({ next, prev }: { next?: any, prev?: any }) {
  if (!next && !prev) return null;
  
  return (
    <div className="flex justify-between mt-12 pt-6 border-t border-border">
      {prev ? (
        <Link href={`/posts/${prev.id}`} className="text-sm text-accent hover:text-secondary">
          ← {prev.title}
        </Link>
      ) : <div />}
      
      {next ? (
        <Link href={`/posts/${next.id}`} className="text-sm text-accent hover:text-secondary">
          {next.title} →
        </Link>
      ) : <div />}
    </div>
  );
}

function TableOfContents({ html }: { html?: string }) {
  if (!html) return null;
  
  // Extract headings from HTML
  const headings: { id: string, text: string, level: number }[] = [];
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ''); // Remove HTML tags from heading text
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    
    headings.push({ id, text, level });
  }
  
  if (headings.length <= 1) return null;
  
  return (
    <div className="terminal-box mb-8">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
        <h2 className="text-sm font-semibold text-foreground">MEMORY_MAP :: <span className="text-secondary">NAVIGATE_PAYLOAD</span></h2>
        <span className="text-xs text-muted-text">[ENCRYPTED_JUMP_TABLE]</span>
      </div>
      <ul className="space-y-1">
        {headings.map((heading, i) => (
          <li key={i} style={{ marginLeft: `${(heading.level - 2) * 1}rem` }} className="text-sm flex items-center">
            <span className="text-accent mr-2">{heading.level === 2 ? '▶' : '▹'}</span>
            <a href={`#${heading.id}`} className="hover:text-secondary text-terminal-text font-mono">
              {heading.text}
            </a>
            <span className="text-muted-text text-xs ml-2">
              0x{(i * 1024 + 0xA000).toString(16).toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
      <div className="text-right text-xs text-secondary mt-2">
        [END_OF_SEGMENT]
      </div>
    </div>
  );
}

function SocialShare({ title, url }: { title: string, url: string }) {
  return (
    <div className="mt-8 terminal-box py-3 px-4">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
        <h3 className="text-sm font-semibold text-foreground">PROPAGATE_DATA :: <span className="text-secondary">SAFE_PROTOCOL</span></h3>
        <span className="text-xs text-accent">[CLEARNET_WARNING]</span>
      </div>
      <p className="text-xs text-muted-text mb-3">
        Distribute this data packet through clearnet channels. Security downgrade required.
        <br />
        <span className="text-accent">Note:</span> Metadata will be attached. Proceed with caution.
      </p>
      <div className="flex space-x-6">
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} 
           target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:text-secondary">
          <span className="text-foreground mr-1">[TWITTER::</span>BROADCAST<span className="text-foreground">]</span>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} 
           target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:text-secondary">
          <span className="text-foreground mr-1">[LINKEDIN::</span>BROADCAST<span className="text-foreground">]</span>
        </a>
      </div>
      <div className="text-xs text-muted-text mt-3 text-right">
        <span className="text-secondary">STATUS::</span> Unsigned message prepared
      </div>
    </div>
  );
}

export default async function Post({ params }: { params: { id: string } }) {
  const id = params.id;
  const postData = await getPostData(id);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/posts/${id}`;
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="terminal-box mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-sm text-foreground hover:text-secondary mr-4">
              [sudo return --secure-channel]  
            </Link>
            <span className="text-xs">
              <span className="connection-status text-accent">●</span> LIVE_CONNECTION
            </span>
          </div>
          <span className="text-muted-text text-xs">
            <span className="text-secondary">SEGMENT::</span> 0x{Array.from(id).map(c => c.charCodeAt(0).toString(16)).join('').substring(0, 12)}
          </span>
        </div>
        <div className="text-xs text-muted-text mt-1">
          <span className="text-secondary">SESSION::</span> <span className="text-terminal-text dynamic-session">{Math.random().toString(36).substring(2, 10)}-{Math.random().toString(36).substring(2, 6)}</span> <span className="text-accent">|</span> <span className="text-secondary">ROUTE::</span> <span className="text-terminal-text">7 HOPS [ANONYMIZED]</span>
        </div>
      </div>
      
      <header className="mb-8 terminal-box">
        <div className="text-xs text-muted-text border-b border-border pb-2 mb-3">
          <span className="text-secondary">./decrypt.sh --verbose --payload="{id}" --key=<span className="dynamic-hash">0xF7A32E91</span></span>
          <div className="progress-bar mt-1"></div>
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-header">{postData.title}</h1>
          <div className="text-xs border border-foreground px-2 py-1 bg-black bg-opacity-20">
            <span className="text-accent">DECRYPTED</span> <span className="text-muted-text">|</span> <span className="text-foreground">{formattedDate}</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center justify-between border-t border-border pt-2">
          <div className="flex items-center">
            <span className="text-secondary text-xs mr-1">ORIGIN::</span>
            <time className="text-sm text-muted-text">
              {postData.date}
            </time>
            {postData.readingTime && <ReadingTime minutes={postData.readingTime} />}
          </div>
          <div className="text-xs text-terminal-text mt-2 sm:mt-0">
            <span className="text-foreground">[INTEGRITY_CHECK::</span> <span className="text-accent">VALID_SIGNATURE</span> <span className="text-foreground">]</span>
          </div>
        </div>
        <TagsList tags={postData.tags} />
      </header>

      <TableOfContents html={postData.contentHtml} />

      <main>
        <article className="prose prose-invert max-w-none terminal-box">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
        </article>
        
        <SocialShare title={postData.title} url={url} />
      </main>

      <PostNavigation next={postData.next} prev={postData.prev} />

      <footer className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-text">
        <div className="terminal-output">
          <div className="text-xs">
            <span className="text-accent">[ system ]</span> <span className="text-secondary">Secure memory cleaning initiated...</span>
          </div>
          <div className="flex justify-center gap-2 my-2">
            <span className="text-foreground">████████</span>
            <span className="text-foreground">████████</span>
            <span className="text-foreground">████████</span>
            <span className="text-muted-text">████████</span>
            <span className="text-muted-text">████████</span>
          </div>
          <div className="text-xs mb-3">
            <span className="text-secondary">DATA_STREAM::</span> <span className="text-terminal-text">Packet processing complete</span>
          </div>
        </div>
        <p>
          © {new Date().getFullYear()} <span className="text-foreground">GAJ's BOREDOM WORKS</span> | <span className="text-accent">THINKING::</span> <span className="text-secondary">IN_PROGRESS</span>
        </p>
        <p className="text-xs mt-1">
          <span className="text-terminal-text">[LEARNING NEVER STOPS :: COME BACK SOON]</span>
        </p>
      </footer>
    </div>
  );
}