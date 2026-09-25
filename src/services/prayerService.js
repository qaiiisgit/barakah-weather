const BASE_URL = "https://api.aladhan.com/v1";

export const fetchPrayerTimes = async (lat, lon, method = 2) => {
    try {
        const today = new Date();
        const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            method,
            date,
        });

        const response = await fetch(`${BASE_URL}/timings/${date}?${params}`);
        if (!response.ok) throw new Error(`Prayer API error: ${response.status}`);
        const data = await response.json();

        if (data.code !== 200) throw new Error(data.status || "Prayer API error");

        return { success: true, data: data.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const PRAYER_NAMES = [
    { key: "Fajr", arabic: "الفجر", icon: "🌅" },
    { key: "Sunrise", arabic: "الشروق", icon: "☀️", isInfo: true },
    { key: "Dhuhr", arabic: "الظهر", icon: "🌞" },
    { key: "Asr", arabic: "العصر", icon: "🌤️" },
    { key: "Maghrib", arabic: "المغرب", icon: "🌇" },
    { key: "Isha", arabic: "العشاء", icon: "🌙" },
];

export const getNextPrayer = (timings) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = PRAYER_NAMES.filter((p) => !p.isInfo).map((prayer) => {
        const [hours, minutes] = timings[prayer.key].split(":").map(Number);
        const prayerMinutes = hours * 60 + minutes;
        return {
            ...prayer,
            time: timings[prayer.key],
            minutes: prayerMinutes,
        };
    });

    const nextPrayer = prayers.find((p) => p.minutes > currentTime);
    return nextPrayer || prayers[0];
};

export const getCountdown = (timeString) => {
    const now = new Date();
    const [hours, minutes] = timeString.split(":").map(Number);

    let prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0, 0);

    if (prayerTime <= now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
    }

    const diff = prayerTime - now;
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    return {
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
        total: diff,
    };
  };

export const formatPrayerTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
};


export const CALCULATION_METHODS = [
    { id: 1, name: 'University of Islamic Sciences, Karachi' },
    { id: 2, name: 'Islamic Society of North America (ISNA)' },
    { id: 3, name: 'Muslim World League' },
    { id: 4, name: 'Umm Al-Qura University, Makkah' },
    { id: 5, name: 'Egyptian General Authority of Survey' },
    { id: 11, name: 'Majlis Ugama Islam Singapura' },
    { id: 12, name: 'Union Organization Islamic de France' },
    { id: 13, name: 'Diyanet İşleri Başkanlığı' },
    { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
];

