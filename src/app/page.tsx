import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Image from 'next/image';

export default function Home() {
  const allPosts = getSortedPostsData();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
  
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="terminal-box mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-header">
            [GAJ@BOREDOM] ~ $ <span className="text-foreground">./access.sh --decrypt /var/data/thoughts</span>
          </h1>
          <div className="text-muted-text text-sm">
            {formattedDate} {formattedTime}
          </div>
        </div>
        
        <div className="text-terminal-text mb-4 border-b border-border pb-3">
          <p><span className="text-accent blink">ACCESS GRANTED</span> :: <span className="text-foreground">Unauthorized monitoring prohibited</span></p>
          <p className="mt-1 text-terminal-text">Learning notes and random ideas // created during moments of boredom</p>
        </div>
        
        <p className="text-xs text-muted-text mb-4">
          <span className="text-secondary">UPLINK:</span> Established via TOR circuit [6 hops]
          <br />
          <span className="text-secondary">CRYPTO:</span> XChaCha20-Poly1305 + Curve25519
          <br />
          <span className="text-secondary">FINGERPRINT:</span> <span className="dynamic-hash">0xD1FF7A1DB374C0DE2022AF7EC76PT0PB4D</span>
          <br />
          <span className="text-secondary">ADVISORY:</span> <span className="text-accent dynamic-quote">The state remains powerless against mathematics</span>
        </p>
      </div>

      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-header">
            <span className="text-foreground">tail -f</span> /var/log/mindstream/packets.log
          </h2>
          <div className="text-xs px-2 py-1 bg-black bg-opacity-30 border border-foreground text-foreground">
            <span className="text-secondary">STREAM::</span> {allPosts.length} data fragments
          </div>
        </div>
        
        <div className="space-y-8">
          {allPosts.map(({ id, date, title, excerpt, tags }) => (
            <article key={id} className="terminal-box pb-4 border-border">
              <div className="flex justify-between items-center mb-2">
                <Link href={`/posts/${id}`}>
                  <h3 className="text-xl font-medium text-accent hover:text-secondary">
                    <span className="text-muted-text text-xs mr-2">[PACKET::<span className="packet-number">{Math.floor(Math.random() * 9000) + 1000}</span>]</span>
                    {title}
                  </h3>
                </Link>
                <div className="flex items-center">
                  <span className="text-xs text-secondary mr-2">TIMESTAMP::</span>
                  <time className="text-sm text-muted-text">
                    {date}
                  </time>
                </div>
              </div>
              
              {tags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-background border border-foreground text-foreground text-xs">
                      <span className="text-secondary">#</span>{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="border-l-2 border-accent pl-3 my-3">
                <p className="text-terminal-text decrypt-text">{excerpt}</p>
                <p className="text-xs text-secondary mt-1">CLASSIFICATION: <span className="typewriter">UNREDACTED</span></p>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Link 
                  href={`/posts/${id}`}
                  className="text-sm font-medium inline-block text-foreground hover:text-secondary glitch-effect"
                >
                  [DECRYPT_FULL_CONTENTS.sh --no-trace]
                </Link>
                
                <div className="text-xs text-muted-text flex items-center">
                  <span className="text-secondary mr-1">HASH::</span>
                  {Array.from(id).map(c => c.charCodeAt(0).toString(16)).join('').substring(0, 8)}...
                  <span className="text-accent ml-1">✓</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-text">
        <div className="mb-4">
          <span className="text-foreground">[GAJ@DARKNODE] ~ $</span> <span className="text-terminal-text">grep -r "freedom" /etc/manifesto</span>
        </div>
        <div className="space-y-2">
          <p className="text-xs">
            <span className="text-accent">»</span> "We must defend our own privacy if we expect to have any." <span className="text-accent">«</span>
          </p>
          <p className="text-xs">
            <span className="text-accent">»</span> "Cypherpunks write code. We know that someone has to write software to defend privacy..." <span className="text-accent">«</span>
          </p>
          <p className="text-xs">
            <span className="text-accent">»</span> "We don't much care if you don't approve of the software we write." <span className="text-accent">«</span>
          </p>
        </div>
        <div className="mt-4 pt-2 border-t border-border">
          <p>© {new Date().getFullYear()} <span className="text-foreground">GAJ's BOREDOM WORKS</span> | <span className="text-xs">Ideas born from idle time</span></p>
          <p className="text-xs mt-1 text-foreground">[BOREDOM :: CREATIVITY CATALYST]</p>
        </div>
      </footer>
    </div>
  );
}