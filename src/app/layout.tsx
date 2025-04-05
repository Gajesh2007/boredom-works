import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaj's Boredom Works",
  description: "Notes, thoughts, and explorations from moments of boredom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${ubuntuMono.variable} antialiased`}>
        <div className="matrix-bg" id="matrix-canvas"></div>
        <div className="noise-overlay"></div>
        {children}
        
        {/* Matrix background effect */}
        <Script id="matrix-effect">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const canvas = document.createElement('canvas');
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              document.getElementById('matrix-canvas').appendChild(canvas);
              
              const ctx = canvas.getContext('2d');
              const fontSize = 12;
              const columns = canvas.width / fontSize;
              const drops = [];
              
              for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * -100);
              }
              
              // Characters to display
              const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
              
              function draw() {
                ctx.fillStyle = 'rgba(30, 30, 46, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#50fa7b';
                ctx.font = fontSize + 'px monospace';
                
                for (let i = 0; i < drops.length; i++) {
                  const text = chars[Math.floor(Math.random() * chars.length)];
                  ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                  
                  if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                  }
                  
                  drops[i]++;
                }
              }
              
              setInterval(draw, 33);
              
              window.addEventListener('resize', function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
              });
            });
          `}
        </Script>
        
        {/* Dynamic cypherpunk elements */}
        <Script id="dynamic-elements">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              // Quotes database
              const cypherpunkQuotes = [
                "Privacy is necessary for an open society in the electronic age.",
                "Cypherpunks write code. We know that someone has to write software to defend privacy.",
                "We must defend our own privacy if we expect to have any.",
                "We don't much care if you don't approve of the software we write.",
                "The state is the enemy. Cryptography is the weapon.",
                "Cryptography is the ultimate form of non-violent direct action.",
                "In a world where surveillance is increasingly prevalent, encryption is the last line of defense.",
                "No amount of violence can solve a math problem.",
                "The math behind cryptography is solid, but the implementation is political.",
                "True privacy requires anonymity, not just encryption."
              ];
              
              // Generate random hex strings
              function generateRandomHex(length) {
                let result = '';
                const characters = '0123456789ABCDEF';
                for (let i = 0; i < length; i++) {
                  result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return result;
              }
              
              // Update advisory quote every 10 seconds
              function updateAdvisoryQuote() {
                const advisoryElements = document.querySelectorAll('.dynamic-quote');
                if (advisoryElements.length > 0) {
                  advisoryElements.forEach(element => {
                    const randomQuote = cypherpunkQuotes[Math.floor(Math.random() * cypherpunkQuotes.length)];
                    element.textContent = randomQuote;
                    element.classList.add('fade-in');
                    setTimeout(() => {
                      element.classList.remove('fade-in');
                    }, 1000);
                  });
                }
                setTimeout(updateAdvisoryQuote, 10000);
              }
              
              // Update fingerprints and hashes
              function updateHashes() {
                const hashElements = document.querySelectorAll('.dynamic-hash');
                if (hashElements.length > 0) {
                  hashElements.forEach(element => {
                    element.textContent = "0x" + generateRandomHex(16);
                  });
                }
                setTimeout(updateHashes, 30000);
              }
              
              // Terminal typing effect for h1
              function applyTypingEffect() {
                // Add terminal-cursor class to specific elements
                const headers = document.querySelectorAll('h1');
                headers.forEach(header => {
                  if (!header.classList.contains('processed-terminal')) {
                    header.classList.add('terminal-cursor', 'processed-terminal');
                    
                    const originalText = header.textContent;
                    header.textContent = '';
                    
                    let i = 0;
                    const typeWriter = () => {
                      if (i < originalText.length) {
                        header.textContent += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 40);
                      }
                    };
                    
                    setTimeout(typeWriter, 200);
                  }
                });
              }

              // Update connection status randomly
              function updateConnectionStatus() {
                const connectionElements = document.querySelectorAll('.connection-status');
                if (connectionElements.length > 0) {
                  connectionElements.forEach(element => {
                    // 90% chance of being connected
                    const isConnected = Math.random() < 0.9;
                    element.textContent = isConnected ? '●' : '○';
                    element.classList.toggle('text-accent', isConnected);
                    element.classList.toggle('text-muted-text', !isConnected);
                  });
                }
                setTimeout(updateConnectionStatus, Math.random() * 5000 + 2000);
              }
              
              // Generate session IDs
              function updateSessionIds() {
                const sessionElements = document.querySelectorAll('.dynamic-session');
                if (sessionElements.length > 0) {
                  sessionElements.forEach(element => {
                    element.textContent = Math.random().toString(36).substring(2, 10) + '-' + Math.random().toString(36).substring(2, 6);
                  });
                }
              }
              
              // Simulate packet numbers incrementing
              let packetCounter = Math.floor(Math.random() * 9000) + 1000;
              function updatePacketNumbers() {
                const packetElements = document.querySelectorAll('.packet-number');
                if (packetElements.length > 0) {
                  packetElements.forEach(element => {
                    packetCounter++;
                    element.textContent = packetCounter;
                    element.classList.add('highlight');
                    setTimeout(() => {
                      element.classList.remove('highlight');
                    }, 300);
                  });
                }
                setTimeout(updatePacketNumbers, Math.random() * 8000 + 5000);
              }
              
              // Start all dynamic updates
              applyTypingEffect();
              updateAdvisoryQuote();
              updateHashes();
              updateConnectionStatus();
              updateSessionIds();
              updatePacketNumbers();
              
              // Reapply effects on navigation
              document.addEventListener('visibilitychange', function() {
                if (!document.hidden) {
                  applyTypingEffect();
                  updateSessionIds();
                }
              });
            });
          `}
        </Script>

        {/* Add decryption animation */}
        <Script id="decryption-effect">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              // Text decryption effect
              function applyDecryptionEffect(element) {
                if (!element || element.classList.contains('decrypted')) return;
                
                const finalText = element.textContent;
                const textLength = finalText.length;
                element.classList.add('decrypted');
                
                let iterations = 0;
                const maxIterations = 10;
                const chars = '!@#$%^&*()_+-=[]{}|;:,./<>?~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                
                const interval = setInterval(() => {
                  iterations++;
                  
                  // Generate scrambled text with progressively more correct characters
                  let scrambledText = '';
                  for (let i = 0; i < textLength; i++) {
                    // Gradually reveal the correct text - more iterations means more correct characters
                    if (i < (textLength * (iterations / maxIterations)) || Math.random() < iterations / maxIterations) {
                      scrambledText += finalText[i];
                    } else {
                      // Get a random character instead
                      scrambledText += chars[Math.floor(Math.random() * chars.length)];
                    }
                  }
                  
                  element.textContent = scrambledText;
                  
                  if (iterations >= maxIterations) {
                    clearInterval(interval);
                    element.textContent = finalText;
                  }
                }, 50);
              }
              
              // Find elements with decrypt-text class and apply effect
              function initDecryptionEffects() {
                const decryptElements = document.querySelectorAll('.decrypt-text');
                decryptElements.forEach(element => {
                  setTimeout(() => {
                    applyDecryptionEffect(element);
                  }, Math.random() * 1000);
                });
              }
              
              // Initialize on page load
              initDecryptionEffects();
              
              // Observe for newly added elements that need decryption effect
              const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                  if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                      if (node.nodeType === 1) { // Element node
                        const decryptElements = node.querySelectorAll ? node.querySelectorAll('.decrypt-text') : [];
                        decryptElements.forEach(element => {
                          setTimeout(() => {
                            applyDecryptionEffect(element);
                          }, Math.random() * 1000);
                        });
                      }
                    });
                  }
                });
              });
              
              observer.observe(document.body, { childList: true, subtree: true });
            });
          `}
        </Script>
      </body>
    </html>
  );
}