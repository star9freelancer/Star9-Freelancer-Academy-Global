const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Hide massive blur blobs on mobile
    // This looks for `<div className="absolute... blur-[...px]` and adds `hidden md:block` if it doesn't already have it
    content = content.replace(/(<div[^>]*className=["'][^"']*)absolute([^"']*blur-\[(?:80|100|120)px\][^"']*["'])/g, (match, prefix, suffix) => {
        if (!suffix.includes('hidden md:block') && !prefix.includes('hidden md:block')) {
            return `${prefix}absolute hidden md:block${suffix}`;
        }
        return match;
    });

    // 2. Reduce heavy backdrop-blur on mobile nav overlay
    // `backdrop-blur-2xl` is mostly used on the mobile menu and modal overlays
    content = content.replace(/backdrop-blur-2xl/g, 'backdrop-blur-none bg-background/100 md:bg-background/98 md:backdrop-blur-2xl');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
});
