const fs = require('fs');
const path = require('path');
const https = require('https');

// Ye function ensure karega ki parser ke liye zaroori .wasm files project me hamesha ho
async function downloadWasmBinaries() {
  const binDir = path.join(__dirname, '../bin');
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir);
  }

  const jsWasmPath = path.join(binDir, 'tree-sitter-javascript.wasm');
  
  // Agar file pehle se h, toh download skip karo
  if (fs.existsSync(jsWasmPath)) return;

  console.log('⏳ Downloading Tree-sitter JavaScript WASM binary...');
  const file = fs.createWriteStream(jsWasmPath);
  
  // ⚡ FIX: Ekdum saaf aur correct URL string paas kiya h yahan
  const wasmUrl = "https://raw.githubusercontent.com/tree-sitter/tree-sitter-javascript/master/src/tree-sitter-javascript.wasm";
  
  https.get(wasmUrl, (response) => {
    // Check karo ki GitHub se response status 200 (Success) aaya h ya nahi
    if (response.statusCode !== 200) {
      console.error(`❌ Failed to download binary. Status Code: ${response.statusCode}`);
      return;
    }

    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log('✅ Tree-sitter WASM Binary downloaded successfully.');
    });
  }).on('error', (err) => {
    fs.unlink(jsWasmPath, () => {});
    console.error(`❌ Binary download failed: ${err.message}`);
  });
}

module.exports = { downloadWasmBinaries };