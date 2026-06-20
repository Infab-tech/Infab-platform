const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'app', '(admin)');

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Replace backgrounds
            content = content.replace(/bg-\[#0c101b\]/g, 'bg-[var(--bg-secondary)]');
            
            // Replace borders
            content = content.replace(/border-white\/5/g, 'border-[var(--text-primary)]/5');
            content = content.replace(/border-white\/10/g, 'border-[var(--text-primary)]/10');
            
            // Replace transparent background hover/active states
            content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-[var(--text-primary)]/[0.02]');
            content = content.replace(/bg-white\/5/g, 'bg-[var(--text-primary)]/5');
            
            // Replace text-white (but ONLY in classNames, simple replace is mostly fine for this codebase)
            content = content.replace(/text-white/g, 'text-[var(--text-primary)]');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated theme classes in: ${fullPath}`);
            }
        }
    }
}

processDirectory(adminDir);
