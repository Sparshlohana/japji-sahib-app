# Complete Japji Sahib Text - Instructions

The current `japji-sahib.json` file has only 6 verses (Mool Mantar + Jap + 4 Pauris).

## To Add Complete Text (38 Pauris + Mool Mantar + Jap + Final Salok = 41 total):

### Option 1: Download from SikhiToTheMax API
```javascript
// Visit: https://api.sikhitothemax.org/
// Or use SearchGurbani.com API
```

### Option 2: Use This Structure

Continue adding Pauris 5-38 following this format:

```json
{
    "id": 6,
    "type": "pauri",
    "number": 5,
    "gurmukhi": "[Full Gurmukhi text]",
    "hindi": "[Full Hindi text]",
    "english": "[Full English transliteration]"
}
```

### Option 3: Copy from These Sources

**Reliable Sources for Complete Japji Sahib:**
1. **SikhiToTheMax.org** - https://www.sikhitothemax.org/
2. **SearchGurbani.com** - https://www.searchgurbani.com/guru-granth-sahib/japji-sahib
3. **GurbaniFiles.org** - Pre-formatted JSON files
4. **iGurbani.com** - Multilingual versions

### Pauris You Need to Add:

Currently have: **Mool Mantar + Jap + Pauris 1-4** (6 total)

**Still need to add:**
- Pauri 5 through Pauri 38 (34 more pauris)
- Final Salok (1)

**Total verses needed:** 41 verses

### Quick Fill Template:

```json
{
    "id": 42,
    "type": "salok",
    "gurmukhi": "ਪਵਣੁ ਗੁਰੂ ਪਾਣੀ ਪਿਤਾ ਮਾਤਾ ਧਰਤਿ ਮਹਤੁ ॥...",
    "hindi": "पवणु गुरू पाणी पिता माता धरति महतु ॥...",
    "english": "Pavan Guru Paanee Pitaa Maataa Dharat Mahat..."
}
```

## Recommended Approach:

1. Visit **SearchGurbani.com**
2. Go to Japji Sahib section
3. Copy each Pauri text
4. Paste into the JSON following the existing format
5. Ensure proper escaping of quotes and special characters

## Or Use This Python Script to Generate:

```python
import requests
import json

# Fetch from SikhiToTheMax API
# Process and format
# Save to japji-sahib.json
```

## Testing After Adding:

1. Validate JSON syntax
2. Check the app displays all verses
3. Test scrolling through entire path
4. Verify all 3 languages show correctly

**ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ** 🙏
