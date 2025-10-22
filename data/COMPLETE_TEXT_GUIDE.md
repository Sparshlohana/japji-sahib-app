# Complete Japji Sahib Text - Instructions

The current `japji-sahib.json` file has only 6 verses as sample data (Mool Mantar + Jap + 4 Pauris).

## Complete Structure Required

**Total verses needed:** 41 verses
- 1 Mool Mantar
- 1 Jap (ਜਪੁ)
- 38 Pauris (ਪਉੜੀਆਂ)
- 1 Final Salok (ਸਲੋਕੁ)

Currently have: **6 verses** (Mool Mantar + Jap + Pauris 1-4)
**Still need:** **35 more verses** (Pauris 5-38 + Final Salok)

## How to Add Complete Text

### Option 1: Use Online APIs (Recommended)

Download complete text from these trusted APIs:

**SikhiToTheMax API**
```javascript
// Fetch from: https://api.sikhitothemax.org/
// Provides complete Japji Sahib in all three scripts
```

**SearchGurbani API**
```javascript
// Visit: https://searchgurbani.com/
// API endpoints for Gurbani text
```

### Option 2: Manual Entry

Continue adding verses to `data/japji-sahib.json` following this exact format:

```json
{
    "id": 6,
    "type": "pauri",
    "number": 5,
    "gurmukhi": "[Full Pauri 5 text in Gurmukhi]",
    "hindi": "[Full Pauri 5 text in Hindi]",
    "english": "[Full Pauri 5 transliteration]"
}
```

**For the Final Salok:**
```json
{
    "id": 42,
    "type": "salok",
    "gurmukhi": "ਪਵਣੁ ਗੁਰੂ ਪਾਣੀ ਪਿਤਾ ਮਾਤਾ ਧਰਤਿ ਮਹਤੁ ॥...",
    "hindi": "पवणु गुरू पाणी पिता माता धरति महतु ॥...",
    "english": "Pavan Guru Paanee Pitaa Maataa Dharat Mahat..."
}
```

**Important Notes:**
- Keep sequential `id` values (6, 7, 8, ... 42)
- Pauri `number` should match the actual Pauri number (5, 6, 7, ... 38)
- Final Salok has `type: "salok"` and no `number` field
- Ensure proper JSON formatting (commas, quotes, brackets)

### Option 3: Copy from Trusted Sources

**Reliable Sources for Complete Japji Sahib:**

1. **SikhiToTheMax.org** 
   - URL: https://www.sikhitothemax.org/
   - Features: Multiple scripts, line-by-line view
   
2. **SearchGurbani.com**
   - URL: https://www.searchgurbani.com/guru-granth-sahib/japji-sahib
   - Features: Complete text with translations
   
3. **GurbaniFiles.org**
   - Pre-formatted JSON files available
   
4. **iGurbani.com**
   - Multilingual versions
   
5. **DiscoverSikhi.com**
   - Educational content with explanations

## Step-by-Step Process

### 1. Choose Your Source
Pick one of the reliable sources listed above

### 2. Copy Text for Each Pauri
For each remaining Pauri (5-38):
- Copy Gurmukhi text
- Copy Hindi translation
- Copy English transliteration

### 3. Format as JSON
Add to `japji-sahib.json`:
```json
{
    "id": [next sequential number],
    "type": "pauri",
    "number": [pauri number],
    "gurmukhi": "[paste Gurmukhi]",
    "hindi": "[paste Hindi]",
    "english": "[paste English]"
}
```

### 4. Don't Forget the Final Salok
After Pauri 38, add the closing Salok

### 5. Validate JSON
- Use a JSON validator (jsonlint.com)
- Check for missing commas
- Ensure all quotes are properly closed
- Verify brackets are balanced

## Testing After Adding

1. **Validate JSON syntax**
   ```bash
   # You can use online tools or:
   node -e "console.log(JSON.parse(require('fs').readFileSync('./data/japji-sahib.json')))"
   ```

2. **Test in app**
   - Open Read Path screen
   - Switch between all 3 languages
   - Scroll through all verses
   - Verify text displays correctly

3. **Check for issues**
   - Missing verses
   - Incorrect ordering
   - Special character rendering
   - Line breaks and formatting

## Common Issues & Solutions

### Special Characters Not Displaying
- Ensure file is saved as UTF-8
- Verify Gurmukhi Unicode characters are properly encoded
- Test on device, not just in code editor

### Text Appearing Cut Off
- Check for very long lines without spaces
- Verify line height calculations in code
- Test on different screen sizes

### Missing Verses in App
- Verify JSON array is properly formatted
- Check that all verses have unique `id` values
- Ensure no syntax errors break JSON parsing

### Quotes Breaking JSON
- Escape internal quotes: `\"` 
- Or use smart text editors that handle escaping automatically

## Automation Option (Advanced)

If you're comfortable with programming, you can create a script to fetch and format the text:

```javascript
// Example Node.js script
const fetch = require('node-fetch');
const fs = require('fs');

async function fetchJapjiSahib() {
    // Fetch from API
    // Format as JSON
    // Save to file
}
```

## Need Help?

If you need assistance adding the complete text:
1. Check the example format in existing `japji-sahib.json`
2. Visit the recommended sources listed above
3. Use JSON validators to check syntax
4. Test incrementally (add a few Pauris, test, repeat)

**ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ** 🙏

---

## File Structure Reference

Your completed `japji-sahib.json` should look like:

```json
[
    { "id": 1, "type": "mool_mantar", ... },
    { "id": 2, "type": "pauri", "number": 0, ... },  // Jap
    { "id": 3, "type": "pauri", "number": 1, ... },
    { "id": 4, "type": "pauri", "number": 2, ... },
    // ... continue through ...
    { "id": 41, "type": "pauri", "number": 38, ... },
    { "id": 42, "type": "salok", ... }
]
```

Total: **42 objects in the array**
