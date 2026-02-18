import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../public/ramadan_data_2026.json');

try {
  const data = fs.readFileSync(jsonPath, 'utf8');
  const jsonData = JSON.parse(data);
  const schedule = jsonData.ramadan_schedule;

  const today = new Date();
  const day = today.getDate();
  const monthIndex = today.getMonth(); // 0-11

  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  const toBengali = (num) => {
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
  };

  const currentMonthName = months[monthIndex];
  const currentDayBengali = toBengali(day);
  const currentDateString = `${currentDayBengali} ${currentMonthName}`;

  console.log(`Current Date (Gregorian): ${day} ${englishMonths[monthIndex]}`);
  console.log(`Current Date (Bengali format): ${currentDateString}`);

  const todayEntry = schedule.find(entry => entry.date === currentDateString);

  if (todayEntry) {
    console.log(`\n--- Today's Schedule ---`);
    console.log(`Ramadan Day: ${todayEntry.day}`);
    console.log(`Date: ${todayEntry.date}`);
    console.log(`Sehri End: ${todayEntry.sehri_end}`);
    console.log(`Fajr Azan: ${todayEntry.fajr_azan}`);
    console.log(`Iftar: ${todayEntry.iftar}`);
  } else {
    console.log('\nNo schedule found for today in the file.');

    // Find next upcoming date
    // Convert current date to comparable value (month * 100 + day)
    const comparableDate = (monthIndex + 1) * 100 + day;

    const monthMap = {
      'জানুয়ারি': 1, 'ফেব্রুয়ারি': 2, 'মার্চ': 3, 'এপ্রিল': 4, 'মে': 5, 'জুন': 6,
      'জুলাই': 7, 'আগস্ট': 8, 'সেপ্টেম্বর': 9, 'অক্টোবর': 10, 'নভেম্বর': 11, 'ডিসেম্বর': 12
    };

    const parseBengaliNumber = (str) => {
      const map = {'০':0, '১':1, '২':2, '৩':3, '৪':4, '৫':5, '৬':6, '৭':7, '৮':8, '৯':9};
      return parseInt(str.split('').map(c => map[c] !== undefined ? map[c] : c).join(''));
    };

    let nextEntry = null;

    for (const entry of schedule) {
      const parts = entry.date.split(' ');
      const d = parseBengaliNumber(parts[0]);
      const m = monthMap[parts[1]];

      const entryComparable = m * 100 + d;

      if (entryComparable > comparableDate) {
        nextEntry = entry;
        break;
      }
    }

    if (nextEntry) {
      console.log(`\n--- Next Scheduled Date ---`);
      console.log(`Date: ${nextEntry.date} (Ramadan Day ${nextEntry.day})`);
      console.log(`Sehri End: ${nextEntry.sehri_end}`);
      console.log(`Fajr Azan: ${nextEntry.fajr_azan}`);
      console.log(`Iftar: ${nextEntry.iftar}`);
    } else {
        console.log("No upcoming dates found in the file.");
    }
  }

} catch (err) {
  console.error('Error reading or parsing JSON:', err);
}
