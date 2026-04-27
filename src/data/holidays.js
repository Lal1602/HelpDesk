/* ── Libur Nasional Indonesia 2025–2027 ─────────────────────── */
export const HOLIDAYS = {
    /* 2025 */
    '2025-01-01': 'Tahun Baru Masehi',
    '2025-01-29': 'Tahun Baru Imlek 2576',
    '2025-03-29': 'Hari Raya Nyepi',
    '2025-03-31': 'Idul Fitri 1446H (Hari 1)',
    '2025-04-01': 'Idul Fitri 1446H (Hari 2)',
    '2025-04-18': 'Wafat Isa Almasih',
    '2025-04-20': 'Paskah',
    '2025-05-01': 'Hari Buruh Internasional',
    '2025-05-12': 'Hari Raya Waisak',
    '2025-05-29': 'Kenaikan Isa Almasih',
    '2025-06-01': 'Hari Lahir Pancasila',
    '2025-06-06': 'Idul Adha 1446H',
    '2025-06-27': 'Tahun Baru Islam 1447H',
    '2025-08-17': 'Hari Kemerdekaan RI',
    '2025-09-05': 'Maulid Nabi Muhammad SAW',
    '2025-12-25': 'Hari Natal',
    '2025-12-26': 'Cuti Bersama Natal',

    /* 2026 */
    '2026-01-01': 'Tahun Baru Masehi',
    '2026-02-17': 'Tahun Baru Imlek 2577',
    '2026-03-20': 'Idul Fitri 1447H (Hari 1)',
    '2026-03-21': 'Idul Fitri 1447H (Hari 2)',
    '2026-03-22': 'Cuti Bersama Idul Fitri',
    '2026-04-03': 'Wafat Isa Almasih',
    '2026-04-05': 'Paskah',
    '2026-04-19': 'Hari Raya Nyepi',
    '2026-05-01': 'Hari Buruh Internasional',
    '2026-05-14': 'Kenaikan Isa Almasih',
    '2026-05-24': 'Hari Raya Waisak',
    '2026-05-27': 'Idul Adha 1447H',
    '2026-06-01': 'Hari Lahir Pancasila',
    '2026-06-17': 'Tahun Baru Islam 1448H',
    '2026-08-17': 'Hari Kemerdekaan RI',
    '2026-09-15': 'Maulid Nabi Muhammad SAW',
    '2026-12-25': 'Hari Natal',
    '2026-12-26': 'Cuti Bersama Natal',

    /* 2027 */
    '2027-01-01': 'Tahun Baru Masehi',
    '2027-02-06': 'Tahun Baru Imlek 2578',
    '2027-03-10': 'Idul Fitri 1448H (Hari 1)',
    '2027-03-11': 'Idul Fitri 1448H (Hari 2)',
    '2027-03-26': 'Wafat Isa Almasih',
    '2027-03-28': 'Paskah',
    '2027-05-01': 'Hari Buruh Internasional',
    '2027-05-17': 'Idul Adha 1448H',
    '2027-05-20': 'Kenaikan Isa Almasih',
    '2027-06-01': 'Hari Lahir Pancasila',
    '2027-06-07': 'Tahun Baru Islam 1449H',
    '2027-08-17': 'Hari Kemerdekaan RI',
    '2027-12-25': 'Hari Natal',
};

export function isHoliday(dateKey) {
    return Object.prototype.hasOwnProperty.call(HOLIDAYS, dateKey);
}

export function getHolidayName(dateKey) {
    return HOLIDAYS[dateKey] ?? null;
}
