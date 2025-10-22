#!/usr/bin/env node

/**
 * Audio Trimming Script
 * 
 * This script trims the first 12 seconds from the Japji Sahib audio file.
 * 
 * Requirements:
 * - FFmpeg must be installed on your system
 * - Install FFmpeg: https://ffmpeg.org/download.html
 *   Windows: Use chocolatey: `choco install ffmpeg` or download from website
 * 
 * Usage:
 * - Run: node scripts/trim-audio.js
 * - Or add to package.json scripts: npm run trim-audio
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const TRIM_SECONDS = 12;
const AUDIO_DIR = path.join(__dirname, '..', 'assets', 'audio');
const INPUT_FILE = path.join(AUDIO_DIR, 'japji-sahib.mp3');
const BACKUP_FILE = path.join(AUDIO_DIR, 'japji-sahib-original.mp3');
const TEMP_FILE = path.join(AUDIO_DIR, 'japji-sahib-trimmed.mp3');

console.log('🎵 Audio Trimming Script');
console.log('========================\n');

// Check if FFmpeg is installed
function checkFFmpeg() {
    try {
        execSync('ffmpeg -version', { stdio: 'pipe' });
        console.log('✅ FFmpeg is installed');
        return true;
    } catch (error) {
        console.error('❌ FFmpeg is not installed!');
        console.error('\nPlease install FFmpeg:');
        console.error('  Windows: choco install ffmpeg');
        console.error('  Or download from: https://ffmpeg.org/download.html\n');
        return false;
    }
}

// Check if input file exists
function checkInputFile() {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`❌ Audio file not found: ${INPUT_FILE}`);
        console.error('Please add japji-sahib.mp3 to the assets/audio directory.\n');
        return false;
    }
    console.log(`✅ Found audio file: ${path.basename(INPUT_FILE)}`);
    return true;
}

// Create backup of original file
function createBackup() {
    if (fs.existsSync(BACKUP_FILE)) {
        console.log('ℹ️  Backup already exists, skipping backup creation');
        return true;
    }

    try {
        fs.copyFileSync(INPUT_FILE, BACKUP_FILE);
        console.log(`✅ Created backup: ${path.basename(BACKUP_FILE)}`);
        return true;
    } catch (error) {
        console.error('❌ Failed to create backup:', error.message);
        return false;
    }
}

// Trim the audio file
function trimAudio() {
    console.log(`\n🔧 Trimming first ${TRIM_SECONDS} seconds from audio...`);

    try {
        // FFmpeg command to trim audio
        // -i: input file
        // -ss: start time (12 seconds in)
        // -acodec copy: copy audio codec without re-encoding (faster)
        // -y: overwrite output file if exists
        const command = `ffmpeg -i "${INPUT_FILE}" -ss ${TRIM_SECONDS} -acodec copy -y "${TEMP_FILE}"`;

        console.log(`Running: ${command}\n`);
        execSync(command, { stdio: 'inherit' });

        console.log('\n✅ Audio trimmed successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to trim audio:', error.message);
        return false;
    }
}

// Replace original file with trimmed version
function replaceOriginal() {
    try {
        fs.unlinkSync(INPUT_FILE);
        fs.renameSync(TEMP_FILE, INPUT_FILE);
        console.log(`✅ Replaced original file with trimmed version`);
        return true;
    } catch (error) {
        console.error('❌ Failed to replace original file:', error.message);
        return false;
    }
}

// Get file size in MB
function getFileSizeMB(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
}

// Display summary
function displaySummary() {
    console.log('\n📊 Summary');
    console.log('==========');

    if (fs.existsSync(BACKUP_FILE)) {
        console.log(`Original file (backup): ${path.basename(BACKUP_FILE)} (${getFileSizeMB(BACKUP_FILE)} MB)`);
    }

    if (fs.existsSync(INPUT_FILE)) {
        console.log(`Trimmed file: ${path.basename(INPUT_FILE)} (${getFileSizeMB(INPUT_FILE)} MB)`);
    }

    console.log(`\n✨ First ${TRIM_SECONDS} seconds removed successfully!`);
    console.log('\nTo restore the original file, rename:');
    console.log(`  ${path.basename(BACKUP_FILE)} → ${path.basename(INPUT_FILE)}`);
}

// Main execution
function main() {
    // Pre-flight checks
    if (!checkFFmpeg()) {
        process.exit(1);
    }

    if (!checkInputFile()) {
        process.exit(1);
    }

    // Create backup
    if (!createBackup()) {
        process.exit(1);
    }

    // Trim audio
    if (!trimAudio()) {
        process.exit(1);
    }

    // Replace original
    if (!replaceOriginal()) {
        process.exit(1);
    }

    // Show summary
    displaySummary();

    console.log('\n✅ Done!\n');
}

// Run the script
main();
