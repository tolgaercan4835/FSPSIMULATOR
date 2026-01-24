import type { ChatMessage, Case, Term, UserProfile, SimulationMode } from './types';

export const TERMINOLOGY_LIST: Term[] = [
    // --- Semptomlar ve Bulgular (Symptome und Befunde) ---
    { id: 7, category: "Semptomlar", latin: "Cephalgie", english: "Headache", turkish: "Baş Ağrısı", german_medical: "Cephalgie", german_common: "Kopfschmerzen" },
    { id: 33, category: "Semptomlar", latin: "Vertigo", english: "Vertigo", turkish: "Baş Dönmesi", german_medical: "Vertigo", german_common: "Schwindel" },
    { id: 34, category: "Semptomlar", latin: "Tinnitus", english: "Tinnitus", turkish: "Kulak Çınlaması", german_medical: "Tinnitus", german_common: "Ohrgeräusch" },
    { id: 35, category: "Semptomlar", latin: "Dyspnoe", english: "Dyspnea", turkish: "Nefes Darlığı", german_medical: "Dyspnoe", german_common: "Atemnot" },
    { id: 36, category: "Semptomlar", latin: "Synkope", english: "Syncope", turkish: "Bayılma", german_medical: "Synkope", german_common: "Ohnmacht" },
    { id: 40, category: "Semptomlar", latin: "Tachykardie", english: "Tachycardia", turkish: "Taşikardi", german_medical: "Tachykardie", german_common: "Herzrasen" },
    { id: 41, category: "Semptomlar", latin: "Bradykardie", english: "Bradycardia", turkish: "Bradikardi", german_medical: "Bradykardie", german_common: "langsamer Herzschlag" },
    { id: 43, category: "Semptomlar", latin: "Nausea", english: "Nausea", turkish: "Bulantı", german_medical: "Nausea", german_common: "Übelkeit" },
    { id: 44, category: "Semptomlar", latin: "Emesis", english: "Vomiting", turkish: "Kusma", german_medical: "Emesis", german_common: "Erbrechen" },
    { id: 45, category: "Semptomlar", latin: "Pyrexie", english: "Fever", turkish: "Ateş", german_medical: "Pyrexie", german_common: "Fieber" },
    { id: 48, category: "Semptomlar", latin: "Epistaxis", english: "Nosebleed", turkish: "Burun Kanaması", german_medical: "Epistaxis", german_common: "Nasenbluten" },
    { id: 49, category: "Semptomlar", latin: "Hämaturie", english: "Hematuria", turkish: "İdrarda Kan", german_medical: "Hämaturie", german_common: "Blut im Urin" },
    { id: 50, category: "Semptomlar", latin: "Pruritus", english: "Itching", turkish: "Kaşıntı", german_medical: "Pruritus", german_common: "Juckreiz" },
    { id: 71, category: "Semptomlar", latin: "Ikterus", english: "Jaundice", turkish: "Sarılık", german_medical: "Ikterus", german_common: "Gelbsucht" },
    { id: 72, category: "Semptomlar", latin: "Zyanose", english: "Cyanosis", turkish: "Siyanoz", german_medical: "Zyanose", german_common: "Blaufärbung der Haut" },
    { id: 73, category: "Semptomlar", latin: "Orthopnoe", english: "Orthopnea", turkish: "Oturunca Azalan Nefes Darlığı", german_medical: "Orthopnoe", german_common: "Atemnot im Liegen" },
    { id: 74, category: "Semptomlar", latin: "Hämoptyse", english: "Hemoptysis", turkish: "Kanlı Balgam", german_medical: "Hämoptyse", german_common: "Bluthusten" },
    { id: 75, category: "Semptomlar", latin: "Meläna", english: "Melena", turkish: "Siyah Dışkı", german_medical: "Meläna", german_common: "Teerstuhl" },
    { id: 76, category: "Semptomlar", latin: "Hämatochezie", english: "Hematochezia", turkish: "Dışkıda Taze Kan", german_medical: "Hämatochezie", german_common: "Blut im Stuhl" },
    { id: 77, category: "Semptomlar", latin: "Dysphagie", english: "Dysphagia", turkish: "Yutma Güçlüğü", german_medical: "Dysphagie", german_common: "Schluckstörung" },
    { id: 78, category: "Semptomlar", latin: "Aphonie", english: "Aphonia", turkish: "Ses Kaybı", german_medical: "Aphonie", german_common: "Stimmlosigkeit" },
    { id: 79, category: "Semptomlar", latin: "Anorexie", english: "Anorexia", turkish: "İştahsızlık", german_medical: "Anorexie", german_common: "Appetitlosigkeit" },
    { id: 80, category: "Semptomlar", latin: "Kachexie", english: "Cachexia", turkish: "Aşırı Zayıflık", german_medical: "Kachexie", german_common: "Auszehrung" },
    { id: 26, category: "Semptomlar", latin: "Insomnie", english: "Insomnia", turkish: "Uykusuzluk", german_medical: "Insomnie", german_common: "Schlaflosigkeit" },
    { id: 6, category: "Semptomlar", latin: "Diarrhoe", english: "Diarrhea", turkish: "İshal", german_medical: "Diarrhoe", german_common: "Durchfall" },
    { id: 25, category: "Semptomlar", latin: "Obstipation", english: "Constipation", turkish: "Kabızlık", german_medical: "Obstipation", german_common: "Verstopfung" },
    { id: 161, category: "Semptomlar", latin: "Diplopie", english: "Double Vision", turkish: "Çift Görme", german_medical: "Diplopie", german_common: "Doppeltsehen" },
    { id: 162, category: "Semptomlar", latin: "Parästhesie", english: "Paresthesia", turkish: "Uyuşma, Karıncalanma", german_medical: "Parästhesie", german_common: "Missempfindung / Kribbeln" },
    { id: 163, category: "Semptomlar", latin: "Alopezie", english: "Hair Loss", turkish: "Saç Dökülmesi", german_medical: "Alopezie", german_common: "Haarausfall" },
    { id: 164, category: "Semptomlar", latin: "Somnolenz", english: "Drowsiness", turkish: "Uyuklama Hali", german_medical: "Somnolenz", german_common: "Schläfrigkeit" },
    { id: 165, category: "Semptomlar", latin: "Singultus", english: "Hiccup", turkish: "Hıçkırık", german_medical: "Singultus", german_common: "Schluckauf" },
    { id: 166, category: "Semptomlar", latin: "Rhinorrhoe", english: "Runny Nose", turkish: "Burun Akıntısı", german_medical: "Rhinorrhoe", german_common: "laufende Nase" },
    { id: 167, category: "Semptomlar", latin: "Odynophagie", english: "Painful Swallowing", turkish: "Ağrılı Yutma", german_medical: "Odynophagie", german_common: "schmerzhaftes Schlucken" },
    { id: 168, category: "Semptomlar", latin: "Pollakisurie", english: "Frequent Urination", turkish: "Sık İdrara Çıkma", german_medical: "Pollakisurie", german_common: "häufiges Wasserlassen" },
    { id: 169, category: "Semptomlar", latin: "Nykturie", english: "Nocturia", turkish: "Gece İdrara Çıkma", german_medical: "Nykturie", german_common: "nächtliches Wasserlassen" },
    { id: 170, category: "Semptomlar", latin: "Enuresis", english: "Bedwetting", turkish: "Altını Islatma", german_medical: "Enuresis", german_common: "Einnässen" },
    { id: 171, category: "Semptomlar", latin: "Palpitation", english: "Palpitation", turkish: "Çarpıntı", german_medical: "Palpitation", german_common: "Herzklopfen" },
    { id: 172, category: "Semptomlar", latin: "Agitation", english: "Agitation", turkish: "Huzursuzluk", german_medical: "Agitation", german_common: "Unruhe" },
    { id: 173, category: "Semptomlar", latin: "Tremor", english: "Tremor", turkish: "Titreme", german_medical: "Tremor", german_common: "Zittern" },
    { id: 174, category: "Semptomlar", latin: "Hypothermie", english: "Hypothermia", turkish: "Vücut Isısı Düşüklüğü", german_medical: "Hypothermie", german_common: "Unterkühlung" },
    { id: 175, category: "Semptomlar", latin: "Hyperthermie", english: "Hyperthermia", turkish: "Vücut Isısı Yüksekliği", german_medical: "Hyperthermie", german_common: "Überhitzung" },
    { id: 176, category: "Semptomlar", latin: "Photophobie", english: "Photophobia", turkish: "Işığa Hassasiyet", german_medical: "Photophobie", german_common: "Lichtscheu" },
    { id: 177, category: "Semptomlar", latin: "Phonophobie", english: "Phonophobia", turkish: "Sese Hassasiyet", german_medical: "Phonophobie", german_common: "Geräuschempfindlichkeit" },
    { id: 178, category: "Semptomlar", latin: "Arthralgie", english: "Joint Pain", turkish: "Eklem Ağrısı", german_medical: "Arthralgie", german_common: "Gelenkschmerz" },
    { id: 179, category: "Semptomlar", latin: "Myalgie", english: "Muscle Pain", turkish: "Kas Ağrısı", german_medical: "Myalgie", german_common: "Muskelschmerz" },
    { id: 180, category: "Semptomlar", latin: "Dysurie", english: "Dysuria", turkish: "Ağrılı İdrar Yapma", german_medical: "Dysurie", german_common: "Brennen beim Wasserlassen" },
    { id: 181, category: "Semptomlar", latin: "Aszites", english: "Ascites", turkish: "Karında Sıvı Toplanması", german_medical: "Aszites", german_common: "Bauchwassersucht" },
    { id: 182, category: "Semptomlar", latin: "Flatulenz", english: "Flatulence", turkish: "Gaz", german_medical: "Flatulenz", german_common: "Blähungen" },
    { id: 183, category: "Semptomlar", latin: "Meteorismus", english: "Bloating", turkish: "Şişkinlik", german_medical: "Meteorismus", german_common: "aufgeblähter Bauch" },
    { id: 184, category: "Semptomlar", latin: "Sputum", english: "Sputum", turkish: "Balgam", german_medical: "Sputum", german_common: "Auswurf" },
    { id: 185, category: "Semptomlar", latin: "Exanthem", english: "Rash", turkish: "Döküntü", german_medical: "Exanthem", german_common: "Hautausschlag" },
    { id: 186, category: "Semptomlar", latin: "Apnoe", english: "Apnea", turkish: "Solunum Durması", german_medical: "Apnoe", german_common: "Atemstillstand" },
    { id: 187, category: "Semptomlar", latin: "Hypoxie", english: "Hypoxia", turkish: "Oksijen Yetersizliği", german_medical: "Hypoxie", german_common: "Sauerstoffmangel" },
    { id: 188, category: "Semptomlar", latin: "Inappetenz", english: "Lack of Appetite", turkish: "İştahsızlık", german_medical: "Inappetenz", german_common: "Appetitlosigkeit" },
    { id: 189, category: "Semptomlar", latin: "Polyphagie", english: "Excessive Hunger", turkish: "Aşırı Yeme İsteği", german_medical: "Polyphagie", german_common: "Heißhunger" },
    { id: 190, category: "Semptomlar", latin: "Polydipsie", english: "Excessive Thirst", turkish: "Aşırı Susama", german_medical: "Polydipsie", german_common: "krankhaft gesteigerter Durst" },
    { id: 191, category: "Semptomlar", latin: "Petechien", english: "Petechiae", turkish: "Noktasal Kanamalar", german_medical: "Petechien", german_common: "punktförmige Hautblutungen" },
    { id: 192, category: "Semptomlar", latin: "Vigilanzminderung", english: "Decreased Vigilance", turkish: "Bilinç Bulanıklığı", german_medical: "Vigilanzminderung", german_common: "Benommenheit" },
    { id: 193, category: "Semptomlar", latin: "Dysarthrie", english: "Dysarthria", turkish: "Konuşma Güçlüğü", german_medical: "Dysarthrie", german_common: "verwaschene Sprache" },
    { id: 194, category: "Semptomlar", latin: "Ataxie", english: "Ataxia", turkish: "Denge Bozukluğu", german_medical: "Ataxie", german_common: "Gangunsicherheit" },
    { id: 195, category: "Semptomlar", latin: "Letargie", english: "Lethargy", turkish: "Letarji", german_medical: "Letargie", german_common: "Trägheit" },
    { id: 196, category: "Semptomlar", latin: "Halitosis", english: "Bad Breath", turkish: "Ağız Kokusu", german_medical: "Halitosis", german_common: "Mundgeruch" },
    { id: 197, category: "Semptomlar", latin: "Gingivahyperplasie", english: "Gingival Hyperplasia", turkish: "Diş Eti Büyümesi", german_medical: "Gingivahyperplasie", german_common: "Zahnfleischwucherung" },
    { id: 198, category: "Semptomlar", latin: "Xerostomie", english: "Dry Mouth", turkish: "Ağız Kuruluğu", german_medical: "Xerostomie", german_common: "Mundtrockenheit" },
    { id: 199, category: "Semptomlar", latin: "Apathie", english: "Apathy", turkish: "Uyuşukluk", german_medical: "Apathie", german_common: "Teilnahmslosigkeit" },
    { id: 200, category: "Semptomlar", latin: "Galaktorrhoe", english: "Galactorrhea", turkish: "Memeden Süt Gelmesi", german_medical: "Galaktorrhoe", german_common: "Milchfluss" },
    // --- Dahiliye (Internal Medicine) ---
    { id: 1, category: "Dahiliye", latin: "Appendizitis", english: "Appendicitis", turkish: "Apandisit", german_medical: "Appendizitis", german_common: "Blinddarmentzündung" },
    { id: 2, category: "Dahiliye", latin: "Cholezystitis", english: "Cholecystitis", turkish: "Safra Kesesi İltihabı", german_medical: "Cholezystitis", german_common: "Gallenblasenentzündung" },
    { id: 4, category: "Dahiliye", latin: "Hypertonie", english: "Hypertension", turkish: "Yüksek Tansiyon", german_medical: "Hypertonie", german_common: "Bluthochdruck" },
    { id: 8, category: "Dahiliye", latin: "Pneumonie", english: "Pneumonia", turkish: "Zatürre", german_medical: "Pneumonie", german_common: "Lungenentzündung" },
    { id: 9, category: "Dahiliye", latin: "Zystitis", english: "Cystitis", turkish: "İdrar Yolu Enfeksiyonu", german_medical: "Zystitis", german_common: "Harnwegsinfekt" },
    { id: 11, category: "Dahiliye", latin: "Hyperthyreose", english: "Hyperthyroidism", turkish: "Tiroid Bezinin Aşırı Çalışması", german_medical: "Hyperthyreose", german_common: "Schilddrüsenüberfunktion" },
    { id: 15, category: "Dahiliye", latin: "Gastritis", english: "Gastritis", turkish: "Gastrit", german_medical: "Gastritis", german_common: "Magenschleimhautentzündung" },
    { id: 16, category: "Dahiliye", latin: "Nephrolithiasis", english: "Kidney Stones", turkish: "Böbrek Taşı", german_medical: "Nephrolithiasis", german_common: "Nierenstein" },
    { id: 19, category: "Dahiliye", latin: "Hypoglykämie", english: "Hypoglycemia", turkish: "Kan Şekeri Düşüklüğü", german_medical: "Hypoglykämie", german_common: "Unterzuckerung" },
    { id: 21, category: "Dahiliye", latin: "Anämie", english: "Anemia", turkish: "Kansızlık", german_medical: "Anämie", german_common: "Blutarmut" },
    { id: 23, category: "Dahiliye", latin: "Ulcus ventriculi", english: "Gastric Ulcer", turkish: "Mide Ülseri", german_medical: "Ulcus ventriculi", german_common: "Magengeschwür" },
    { id: 46, category: "Dahiliye", latin: "Sepsis", english: "Sepsis", turkish: "Sepsis", german_medical: "Sepsis", german_common: "Blutvergiftung" },
    { id: 81, category: "Dahiliye", latin: "Pankreatitis", english: "Pancreatitis", turkish: "Pankreas İltihabı", german_medical: "Pankreatitis", german_common: "Bauchspeicheldrüsenentzündung" },
    { id: 82, category: "Dahiliye", latin: "Hepatitis", english: "Hepatitis", turkish: "Hepatit", german_medical: "Hepatitis", german_common: "Leberentzündung" },
    { id: 83, category: "Dahiliye", latin: "Leberzirrhose", english: "Liver Cirrhosis", turkish: "Karaciğer Sirozu", german_medical: "Leberzirrhose", german_common: "Schrumpfleber" },
    { id: 84, category: "Dahiliye", latin: "Gicht", english: "Gout", turkish: "Gut Hastalığı", german_medical: "Urikopathie", german_common: "Gicht" },
    { id: 85, category: "Dahiliye", latin: "Asthma bronchiale", english: "Bronchial Asthma", turkish: "Astım", german_medical: "Asthma bronchiale", german_common: "Asthma" },
    { id: 86, category: "Dahiliye", latin: "COPD", english: "COPD", turkish: "KOAH", german_medical: "COPD", german_common: "Raucherlunge" },
    { id: 201, category: "Dahiliye", latin: "Diabetes mellitus", english: "Diabetes", turkish: "Şeker Hastalığı", german_medical: "Diabetes mellitus", german_common: "Zuckerkrankheit" },
    { id: 202, category: "Dahiliye", latin: "Gastroenteritis", english: "Gastroenteritis", turkish: "Mide-Bağırsak Enfeksiyonu", german_medical: "Gastroenteritis", german_common: "Magen-Darm-Grippe" },
    { id: 203, category: "Dahiliye", latin: "Pyelonephritis", english: "Pyelonephritis", turkish: "Böbrek Enfeksiyonu", german_medical: "Pyelonephritis", german_common: "Nierenbeckenentzündung" },
    { id: 204, category: "Dahiliye", latin: "Refluxösophagitis", english: "Reflux Esophagitis", turkish: "Reflü", german_medical: "Refluxösophagitis", german_common: "Sodbrennen" },
    { id: 205, category: "Dahiliye", latin: "Divertikulitis", english: "Diverticulitis", turkish: "Divertikülit", german_medical: "Divertikulitis", german_common: "Entzündung von Ausstülpungen der Darmwand" },
    { id: 206, category: "Dahiliye", latin: "Cholelithiasis", english: "Gallstones", turkish: "Safra Taşı", german_medical: "Cholelithiasis", german_common: "Gallenstein" },
    { id: 207, category: "Dahiliye", latin: "Morbus Crohn", english: "Crohn's Disease", turkish: "Crohn Hastalığı", german_medical: "Morbus Crohn", german_common: "Morbus Crohn" },
    { id: 208, category: "Dahiliye", latin: "Colitis ulcerosa", english: "Ulcerative Colitis", turkish: "Ülseratif Kolit", german_medical: "Colitis ulcerosa", german_common: "chronische Darmentzündung" },
    { id: 209, category: "Dahiliye", latin: "Hypothyreose", english: "Hypothyroidism", turkish: "Tiroid Bezinin Az Çalışması", german_medical: "Hypothyreose", german_common: "Schilddrüsenunterfunktion" },
    { id: 210, category: "Dahiliye", latin: "Zöliakie", english: "Celiac Disease", turkish: "Çölyak Hastalığı", german_medical: "Zöliakie", german_common: "Glutenunverträglichkeit" },
    { id: 211, category: "Dahiliye", latin: "Thrombophilie", english: "Thrombophilia", turkish: "Pıhtılaşma Eğilimi", german_medical: "Thrombophilie", german_common: "erhöhte Thromboseneigung" },
    { id: 212, category: "Dahiliye", latin: "Hämophilie", english: "Hemophilia", turkish: "Hemofili", german_medical: "Hämophilie", german_common: "Bluterkrankheit" },
    { id: 213, category: "Dahiliye", latin: "Hyperlipidämie", english: "Hyperlipidemia", turkish: "Yüksek Kolesterol", german_medical: "Hyperlipidämie", german_common: "erhöhte Blutfettwerte" },
    { id: 214, category: "Dahiliye", latin: "Mukoviszidose", english: "Cystic Fibrosis", turkish: "Kistik Fibrozis", german_medical: "Mukoviszidose", german_common: "zystische Fibrose" },
    { id: 215, category: "Dahiliye", latin: "Bronchitis", english: "Bronchitis", turkish: "Bronşit", german_medical: "Bronchitis", german_common: "Entzündung der Bronchien" },
    { id: 216, category: "Dahiliye", latin: "Pleuritis", english: "Pleurisy", turkish: "Akciğer Zarı İltihabı", german_medical: "Pleuritis", german_common: "Rippenfellentzündung" },
    { id: 217, category: "Dahiliye", latin: "Pneumothorax", english: "Pneumothorax", turkish: "Akciğer Sönmesi", german_medical: "Pneumothorax", german_common: "Kollaps der Lunge" },
    { id: 218, category: "Dahiliye", latin: "Peritonitis", english: "Peritonitis", turkish: "Karın Zarı İltihabı", german_medical: "Peritonitis", german_common: "Bauchfellentzündung" },
    // --- Kardiyoloji (Cardiology) ---
    { id: 3, category: "Kardiyoloji", latin: "Myokardinfarkt", english: "Myocardial Infarction", turkish: "Kalp Krizi", german_medical: "Myokardinfarkt", german_common: "Herzinfarkt" },
    { id: 14, category: "Kardiyoloji", latin: "Vorhofflimmern", english: "Atrial Fibrillation", turkish: "Atriyal Fibrilasyon", german_medical: "Vorhofflimmern", german_common: "Herzrhythmusstörung" },
    { id: 13, category: "Kardiyoloji", latin: "Tiefe Venenthrombose (TVT)", english: "Deep Vein Thrombosis (DVT)", turkish: "Derin Ven Trombozu", german_medical: "Tiefe Venenthrombose", german_common: "Thrombose" },
    { id: 87, category: "Kardiyoloji", latin: "Herzinsuffizienz", english: "Heart Failure", turkish: "Kalp Yetmezliği", german_medical: "Herzinsuffizienz", german_common: "Herzschwäche" },
    { id: 88, category: "Kardiyoloji", latin: "Angina Pectoris", english: "Angina Pectoris", turkish: "Göğüs Ağrısı", german_medical: "Angina Pectoris", german_common: "Herzenge" },
    { id: 89, category: "Kardiyoloji", latin: "Lungenembolie", english: "Pulmonary Embolism", turkish: "Akciğer Embolisi", german_medical: "Lungenembolie", german_common: "Lungenembolie" },
    { id: 90, category: "Kardiyoloji", latin: "Kardiomyopathie", english: "Cardiomyopathy", turkish: "Kardiyomiyopati", german_medical: "Kardiomyopathie", german_common: "Herzmuskelerkrankung" },
    { id: 38, category: "Kardiyoloji", latin: "Ödem", english: "Edema", turkish: "Ödem", german_medical: "Ödem", german_common: "Wassereinlagerung" },
    { id: 219, category: "Kardiyoloji", latin: "Endokarditis", english: "Endocarditis", turkish: "Kalp İç Zarı İltihabı", german_medical: "Endokarditis", german_common: "Herzinnenhautentzündung" },
    { id: 220, category: "Kardiyoloji", latin: "Myokarditis", english: "Myocarditis", turkish: "Kalp Kası İltihabı", german_medical: "Myokarditis", german_common: "Herzmuskelentzündung" },
    { id: 221, category: "Kardiyoloji", latin: "Perikarditis", english: "Pericarditis", turkish: "Kalp Dış Zarı İltihabı", german_medical: "Perikarditis", german_common: "Herzbeutelentzündung" },
    { id: 222, category: "Kardiyoloji", latin: "Koronare Herzkrankheit (KHK)", english: "Coronary Artery Disease", turkish: "Koroner Arter Hastalığı", german_medical: "Koronare Herzkrankheit", german_common: "Verengung der Herzkranzgefäße" },
    { id: 223, category: "Kardiyoloji", latin: "Aortenaneurysma", english: "Aortic Aneurysm", turkish: "Aort Anevrizması", german_medical: "Aortenaneurysma", german_common: "Aussackung der Hauptschlagader" },
    { id: 224, category: "Kardiyoloji", latin: "Aortendissektion", english: "Aortic Dissection", turkish: "Aort Yırtılması", german_medical: "Aortendissektion", german_common: "Aufspaltung der Wandschichten der Hauptschlagader" },
    { id: 225, category: "Kardiyoloji", latin: "Mitralklappenprolaps", english: "Mitral Valve Prolapse", turkish: "Mital Kapak Prolapsusu", german_medical: "Mitralklappenprolaps", german_common: "Durchbiegen der Mitralklappe" },
    { id: 226, category: "Kardiyoloji", latin: "Herzklappenstenose", english: "Heart Valve Stenosis", turkish: "Kalp Kapağı Darlığı", german_medical: "Herzklappenstenose", german_common: "Verengung einer Herzklappe" },
    { id: 227, category: "Kardiyoloji", latin: "Herzklappeninsuffizienz", english: "Heart Valve Regurgitation", turkish: "Kalp Kapağı Yetmezliği", german_medical: "Herzklappeninsuffizienz", german_common: "undichte Herzklappe" },
    { id: 228, category: "Kardiyoloji", latin: "pAVK (periphere arterielle Verschlusskrankheit)", english: "Peripheral Artery Disease", turkish: "Periferik Arter Hastalığı", german_medical: "pAVK", german_common: "Schaufensterkrankheit" },
    { id: 229, category: "Kardiyoloji", latin: "Arrhythmie", english: "Arrhythmia", turkish: "Ritim Bozukluğu", german_medical: "Arrhythmie", german_common: "Herzrhythmusstörung" },
    { id: 230, category: "Kardiyoloji", latin: "Ventrikelseptumdefekt", english: "Ventricular Septal Defect", turkish: "Ventriküler Septal Defekt", german_medical: "Ventrikelseptumdefekt", german_common: "Loch in der Herzscheidewand" },
    // --- Nöroloji (Neurology) ---
    { id: 20, category: "Nöroloji", latin: "Apoplex", english: "Stroke", turkish: "İnme / Felç", german_medical: "Apoplex", german_common: "Schlaganfall" },
    { id: 47, category: "Nöroloji", latin: "Aphasie", english: "Aphasia", turkish: "Afazi / Konuşma Bozukluğu", german_medical: "Aphasie", german_common: "Sprachstörung" },
    { id: 91, category: "Nöroloji", latin: "Epilepsie", english: "Epilepsy", turkish: "Epilepsi", german_medical: "Epilepsie", german_common: "Krampfanfall" },
    { id: 92, category: "Nöroloji", latin: "Meningitis", english: "Meningitis", turkish: "Menenjit", german_medical: "Meningitis", german_common: "Hirnhautentzündung" },
    { id: 93, category: "Nöroloji", latin: "Multiple Sklerose (MS)", english: "Multiple Sclerosis", turkish: "Multipl Skleroz", german_medical: "Multiple Sklerose", german_common: "Multiple Sklerose" },
    { id: 94, category: "Nöroloji", latin: "Morbus Parkinson", english: "Parkinson's Disease", turkish: "Parkinson Hastalığı", german_medical: "Morbus Parkinson", german_common: "Schüttellähmung" },
    { id: 95, category: "Nöroloji", latin: "Demenz", english: "Dementia", turkish: "Bunama", german_medical: "Demenz", german_common: "Demenz" },
    { id: 30, category: "Nöroloji", latin: "Commotio cerebri", english: "Cerebral Concussion", turkish: "Beyin Sarsıntısı", german_medical: "Commotio cerebri", german_common: "Gehirnerschütterung" },
    { id: 231, category: "Nöroloji", latin: "Migräne", english: "Migraine", turkish: "Migren", german_medical: "Migräne", german_common: "Migräne" },
    { id: 232, category: "Nöroloji", latin: "Enzephalitis", english: "Encephalitis", turkish: "Beyin İltihabı", german_medical: "Enzephalitis", german_common: "Gehirnentzündung" },
    { id: 233, category: "Nöroloji", latin: "Subarachnoidalblutung", english: "Subarachnoid Hemorrhage", turkish: "Subaraknoid Kanama", german_medical: "Subarachnoidalblutung", german_common: "Hirnblutung" },
    { id: 234, category: "Nöroloji", latin: "Amyotrophe Lateralsklerose (ALS)", english: "ALS", turkish: "ALS", german_medical: "Amyotrophe Lateralsklerose", german_common: "ALS" },
    { id: 235, category: "Nöroloji", latin: "Guillain-Barré-Syndrom", english: "Guillain-Barré Syndrome", turkish: "Guillain-Barré Sendromu", german_medical: "Guillain-Barré-Syndrom", german_common: "Guillain-Barré-Syndrom" },
    { id: 236, category: "Nöroloji", latin: "Myasthenia gravis", english: "Myasthenia Gravis", turkish: "Myasthenia Gravis", german_medical: "Myasthenia gravis", german_common: "schwere Muskelschwäche" },
    { id: 237, category: "Nöroloji", latin: "Polyneuropathie", english: "Polyneuropathy", turkish: "Polinöropati", german_medical: "Polyneuropathie", german_common: "Nervenschädigung in Armen und Beinen" },
    { id: 238, category: "Nöroloji", latin: "Fazialisparese", english: "Facial Palsy", turkish: "Yüz Felci", german_medical: "Fazialisparese", german_common: "Gesichtslähmung" },
    { id: 239, category: "Nöroloji", latin: "Trigeminusneuralgie", english: "Trigeminal Neuralgia", turkish: "Trigeminal Nevralji", german_medical: "Trigeminusneuralgie", german_common: "Gesichtsschmerz" },
    { id: 240, category: "Nöroloji", latin: "Restless-Legs-Syndrom", english: "Restless Legs Syndrome", turkish: "Huzursuz Bacak Sendromu", german_medical: "Restless-Legs-Syndrom", german_common: "unruhige Beine" },
    { id: 241, category: "Nöroloji", latin: "Hydrozephalus", english: "Hydrocephalus", turkish: "Hidrosefali", german_medical: "Hydrozephalus", german_common: "Wasserkopf" },
    { id: 242, category: "Nöroloji", latin: "Transitorische ischämische Attacke (TIA)", english: "Transient Ischemic Attack (TIA)", turkish: "Geçici İskemik Atak", german_medical: "TIA", german_common: "kurzzeitige Durchblutungsstörung des Gehirns" },
    // --- Cerrahi (Surgery) ---
    { id: 5, category: "Cerrahi", latin: "Fraktur", english: "Fracture", turkish: "Kırık", german_medical: "Fraktur", german_common: "Knochenbruch" },
    { id: 12, category: "Cerrahi", latin: "Inguinalhernie", english: "Inguinal Hernia", turkish: "Kasık Fıtığı", german_medical: "Inguinalhernie", german_common: "Leistenbruch" },
    { id: 22, category: "Cerrahi", latin: "Embolie", english: "Embolism", turkish: "Emboli", german_medical: "Embolie", german_common: "Gefäßverschluss" },
    { id: 39, category: "Cerrahi", latin: "Hämatom", english: "Hematoma", turkish: "Hematom", german_medical: "Hämatom", german_common: "Bluterguss" },
    { id: 42, category: "Cerrahi", latin: "Hämorrhagie", english: "Hemorrhage", turkish: "Kanama", german_medical: "Hämorrhagie", german_common: "Blutung" },
    { id: 96, category: "Cerrahi", latin: "Abszess", english: "Abscess", turkish: "Apse", german_medical: "Abszess", german_common: "Eiterbeule" },
    { id: 97, category: "Cerrahi", latin: "Anastomose", english: "Anastomosis", turkish: "Anastomoz", german_medical: "Anastomose", german_common: "Verbindung von Hohlorganen" },
    { id: 98, category: "Cerrahi", latin: "Transplantation", english: "Transplantation", turkish: "Organ Nakli", german_medical: "Transplantation", german_common: "Organverpflanzung" },
    { id: 243, category: "Cerrahi", latin: "Ileus", english: "Ileus", turkish: "Bağırsak Tıkanıklığı", german_medical: "Ileus", german_common: "Darmverschluss" },
    { id: 244, category: "Cerrahi", latin: "Polyp", english: "Polyp", turkish: "Polip", german_medical: "Polyp", german_common: "Schleimhautwucherung" },
    { id: 245, category: "Cerrahi", latin: "Fistel", english: "Fistula", turkish: "Fistül", german_medical: "Fistel", german_common: "röhrenartige Verbindung" },
    { id: 246, category: "Cerrahi", latin: "Anaphylaxie", english: "Anaphylaxis", turkish: "Anafilaksi", german_medical: "Anaphylaxie", german_common: "allergischer Schock" },
    { id: 247, category: "Cerrahi", latin: "Phlegmone", english: "Phlegmon", turkish: "Flegmon", german_medical: "Phlegmone", german_common: "eitrige Entzündung des Bindegewebes" },
    { id: 248, category: "Cerrahi", latin: "Gangrän", english: "Gangrene", turkish: "Kangren", german_medical: "Gangrän", german_common: "Wundbrand" },
    { id: 249, category: "Cerrahi", latin: "Hernie", english: "Hernia", turkish: "Fıtık", german_medical: "Hernie", german_common: "Bruch" },
    { id: 250, category: "Cerrahi", latin: "Laparotomie", english: "Laparotomy", turkish: "Laparotomi", german_medical: "Laparotomie", german_common: "Bauchschnitt" },
    { id: 251, category: "Cerrahi", latin: "Thorakotomie", english: "Thoracotomy", turkish: "Torakotomi", german_medical: "Thorakotomie", german_common: "Öffnung des Brustkorbs" },
    { id: 252, category: "Cerrahi", latin: "Amputation", english: "Amputation", turkish: "Amputasyon", german_medical: "Amputation", german_common: "Abtrennung eines Körperteils" },
    { id: 253, category: "Cerrahi", latin: "Adhäsion", english: "Adhesion", turkish: "Yapışıklık", german_medical: "Adhäsion", german_common: "Verwachsung" },
    { id: 254, category: "Cerrahi", latin: "Dehiszenz", english: "Dehiscence", turkish: "Yara Açılması", german_medical: "Dehiszenz", german_common: "Auseinanderweichen von Wundrändern" },
    // --- Ortopedi (Orthopedics) ---
    { id: 10, category: "Ortopedi", latin: "Lumbaler Bandscheibenvorfall", english: "Lumbar Disc Herniation", turkish: "Bel Fıtığı", german_medical: "Lumbaler Bandscheibenvorfall", german_common: "Bandscheibenvorfall" },
    { id: 27, category: "Ortopedi", latin: "Kontusion", english: "Contusion", turkish: "Ezilme", german_medical: "Kontusion", german_common: "Prellung" },
    { id: 28, category: "Ortopedi", latin: "Distorsion", english: "Sprain", turkish: "Burkulma", german_medical: "Distorsion", german_common: "Verstauchung" },
    { id: 29, category: "Ortopedi", latin: "Luxation", english: "Dislocation", turkish: "Çıkık", german_medical: "Luxation", german_common: "Verrenkung" },
    { id: 131, category: "Ortopedi", latin: "Arthritis", english: "Arthritis", turkish: "Eklem İltihabı", german_medical: "Arthritis", german_common: "Gelenkentzündung" },
    { id: 132, category: "Ortopedi", latin: "Arthrose", english: "Arthrosis", turkish: "Eklem Kireçlenmesi", german_medical: "Arthrose", german_common: "Gelenkverschleiß" },
    { id: 133, category: "Ortopedi", latin: "Osteoporose", english: "Osteoporosis", turkish: "Kemik Erimesi", german_medical: "Osteoporose", german_common: "Knochenschwund" },
    { id: 134, category: "Ortopedi", latin: "Skoliose", english: "Scoliosis", turkish: "Skolyoz", german_medical: "Skoliose", german_common: "Wirbelsäulenverkrümmung" },
    { id: 255, category: "Ortopedi", latin: "Tendinitis", english: "Tendonitis", turkish: "Tendon İltihabı", german_medical: "Tendinitis", german_common: "Sehnenentzündung" },
    { id: 256, category: "Ortopedi", latin: "Bursitis", english: "Bursitis", turkish: "Bursa İltihabı", german_medical: "Bursitis", german_common: "Schleimbeutelentzündung" },
    { id: 257, category: "Ortopedi", latin: "Karpaltunnelsyndrom", english: "Carpal Tunnel Syndrome", turkish: "Karpal Tünel Sendromu", german_medical: "Karpaltunnelsyndrom", german_common: "Karpaltunnelsyndrom" },
    { id: 258, category: "Ortopedi", latin: "Meniskusläsion", english: "Meniscus Tear", turkish: "Menisküs Yırtığı", german_medical: "Meniskusläsion", german_common: "Meniskusriss" },
    { id: 259, category: "Ortopedi", latin: "Ligamentruptur", english: "Ligament Rupture", turkish: "Bağ Yırtılması", german_medical: "Ligamentruptur", german_common: "Bänderriss" },
    { id: 260, category: "Ortopedi", latin: "Osteomyelitis", english: "Osteomyelitis", turkish: "Kemik İltihabı", german_medical: "Osteomyelitis", german_common: "Knochenmarkentzündung" },
    { id: 261, category: "Ortopedi", latin: "Spondylarthrose", english: "Spondylarthrosis", turkish: "Omurga Kireçlenmesi", german_medical: "Spondylarthrose", german_common: "Verschleiß der Wirbelgelenke" },
    { id: 262, category: "Ortopedi", latin: "Epicondylitis", english: "Epicondylitis", turkish: "Tenisçi Dirseği", german_medical: "Epicondylitis", german_common: "Tennisarm" },
    { id: 263, category: "Ortopedi", latin: "Kyphose", english: "Kyphosis", turkish: "Kifoz", german_medical: "Kyphose", german_common: "Rundrücken" },
    { id: 264, category: "Ortopedi", latin: "Lordose", english: "Lordosis", turkish: "Lordoz", german_medical: "Lordose", german_common: "Hohlkreuz" },
    { id: 265, category: "Ortopedi", latin: "Hallux valgus", english: "Bunion", turkish: "Halluks Valgus", german_medical: "Hallux valgus", german_common: "Ballenzeh" },
    { id: 266, category: "Ortopedi", latin: "Morbus Bechterew", english: "Ankylosing Spondylitis", turkish: "Ankilozan Spondilit", german_medical: "Morbus Bechterew", german_common: "Morbus Bechterew" },
    // --- Dermatoloji (Dermatology) ---
    { id: 126, category: "Dermatoloji", latin: "Urtikaria", english: "Hives", turkish: "Kurdeşen", german_medical: "Urtikaria", german_common: "Nesselsucht" },
    { id: 127, category: "Dermatoloji", latin: "Psoriasis", english: "Psoriasis", turkish: "Sedef Hastalığı", german_medical: "Psoriasis", german_common: "Schuppenflechte" },
    { id: 128, category: "Dermatoloji", latin: "Dermatitis", english: "Dermatitis", turkish: "Dermatit", german_medical: "Dermatitis", german_common: "Hautentzündung" },
    { id: 129, category: "Dermatoloji", latin: "Ekzem", english: "Eczema", turkish: "Egzama", german_medical: "Ekzem", german_common: "Ekzem" },
    { id: 130, category: "Dermatoloji", latin: "Akne", english: "Acne", turkish: "Akne", german_medical: "Akne", german_common: "Akne" },
    { id: 267, category: "Dermatoloji", latin: "Herpes Zoster", english: "Shingles", turkish: "Zona", german_medical: "Herpes Zoster", german_common: "Gürtelrose" },
    { id: 268, category: "Dermatoloji", latin: "Erysipel", english: "Erysipelas", turkish: "Yılancık", german_medical: "Erysipel", german_common: "Wundrose" },
    { id: 269, category: "Dermatoloji", latin: "Melanom", english: "Melanoma", turkish: "Melanom", german_medical: "Melanom", german_common: "schwarzer Hautkrebs" },
    { id: 270, category: "Dermatoloji", latin: "Basaliom", english: "Basal Cell Carcinoma", turkish: "Bazal Hücreli Karsinom", german_medical: "Basaliom", german_common: "weißer Hautkrebs" },
    { id: 271, category: "Dermatoloji", latin: "Neurodermitis", english: "Atopic Dermatitis", turkish: "Atopik Dermatit", german_medical: "Atopische Dermatitis", german_common: "Neurodermitis" },
    { id: 272, category: "Dermatoloji", latin: "Verruca", english: "Wart", turkish: "Siğil", german_medical: "Verruca", german_common: "Warze" },
    { id: 273, category: "Dermatoloji", latin: "Nävus", english: "Mole", turkish: "Ben", german_medical: "Nävus", german_common: "Muttermal" },
    { id: 274, category: "Dermatoloji", latin: "Mykose", english: "Fungal Infection", turkish: "Mantar Enfeksiyonu", german_medical: "Mykose", german_common: "Pilzinfektion" },
    { id: 275, category: "Dermatoloji", latin: "Rosazea", english: "Rosacea", turkish: "Gül Hastalığı", german_medical: "Rosazea", german_common: "Kupferrose" },
    { id: 276, category: "Dermatoloji", latin: "Skabies", english: "Scabies", turkish: "Uyuz", german_medical: "Skabies", german_common: "Krätze" },
    { id: 277, category: "Dermatoloji", latin: "Candidose", english: "Candidiasis", turkish: "Kandidiyaz", german_medical: "Candidose", german_common: "Soor" },
    { id: 278, category: "Dermatoloji", latin: "Impetigo contagiosa", english: "Impetigo", turkish: "İmpetigo", german_medical: "Impetigo contagiosa", german_common: "Borkenflechte" },
    // --- Jinekoloji (Gynecology) ---
    { id: 135, category: "Jinekoloji", latin: "Gravidität", english: "Pregnancy", turkish: "Gebelik", german_medical: "Gravidität", german_common: "Schwangerschaft" },
    { id: 136, category: "Jinekoloji", latin: "Menstruation", english: "Menstruation", turkish: "Adet Kanaması", german_medical: "Menstruation", german_common: "Regelblutung" },
    { id: 137, category: "Jinekoloji", latin: "Amenorrhoe", english: "Amenorrhea", turkish: "Adet Görememe", german_medical: "Amenorrhoe", german_common: "Ausbleiben der Regelblutung" },
    { id: 138, category: "Jinekoloji", latin: "Dysmenorrhoe", english: "Dysmenorrhea", turkish: "Ağrılı Adet", german_medical: "Dysmenorrhoe", german_common: "Regelschmerzen" },
    { id: 139, category: "Jinekoloji", latin: "Abort", english: "Abortion / Miscarriage", turkish: "Düşük", german_medical: "Abort", german_common: "Fehlgeburt" },
    { id: 140, category: "Jinekoloji", latin: "Sectio caesarea", english: "Cesarean Section", turkish: "Sezaryen", german_medical: "Sectio caesarea", german_common: "Kaiserschnitt" },
    { id: 279, category: "Jinekoloji", latin: "Endometriose", english: "Endometriosis", turkish: "Endometriozis", german_medical: "Endometriose", german_common: "Endometriose" },
    { id: 280, category: "Jinekoloji", latin: "Myom", english: "Myoma", turkish: "Miyom", german_medical: "Myom", german_common: "Muskelknoten in der Gebärmutter" },
    { id: 281, category: "Jinekoloji", latin: "Extrauteringravidität", english: "Ectopic Pregnancy", turkish: "Dış Gebelik", german_medical: "Extrauteringravidität", german_common: "Eileiterschwangerschaft" },
    { id: 282, category: "Jinekoloji", latin: "Menopause", english: "Menopause", turkish: "Menopoz", german_medical: "Menopause", german_common: "Wechseljahre" },
    { id: 283, category: "Jinekoloji", latin: "Salpingitis", english: "Salpingitis", turkish: "Tüplerin İltihabı", german_medical: "Salpingitis", german_common: "Eileiterentzündung" },
    { id: 284, category: "Jinekoloji", latin: "Hysterektomie", english: "Hysterectomy", turkish: "Rahmin Alınması", german_medical: "Hysterektomie", german_common: "Gebärmutterentfernung" },
    { id: 285, category: "Jinekoloji", latin: "Mastitis", english: "Mastitis", turkish: "Meme İltihabı", german_medical: "Mastitis", german_common: "Brustdrüsenentzündung" },
    { id: 286, category: "Jinekoloji", latin: "Ovarialzyste", english: "Ovarian Cyst", turkish: "Yumurtalık Kisti", german_medical: "Ovarialzyste", german_common: "Eierstockzyste" },
    { id: 287, category: "Jinekoloji", latin: "Vaginitis", english: "Vaginitis", turkish: "Vajinit", german_medical: "Vaginitis", german_common: "Scheidenentzündung" },
    { id: 288, category: "Jinekoloji", latin: "Fluor vaginalis", english: "Vaginal Discharge", turkish: "Vajinal Akıntı", german_medical: "Fluor vaginalis", german_common: "Scheidenausfluss" },
    { id: 289, category: "Jinekoloji", latin: "Kontrazeption", english: "Contraception", turkish: "Doğum Kontrolü", german_medical: "Kontrazeption", german_common: "Empfängnisverhütung" },
    // --- Pediatri (Pediatrics) ---
    { id: 141, category: "Pediatri", latin: "Pertussis", english: "Whooping Cough", turkish: "Boğmaca", german_medical: "Pertussis", german_common: "Keuchhusten" },
    { id: 142, category: "Pediatri", latin: "Morbilli", english: "Measles", turkish: "Kızamık", german_medical: "Morbilli", german_common: "Masern" },
    { id: 143, category: "Pediatri", latin: "Varizellen", english: "Chickenpox", turkish: "Suçiçeği", german_medical: "Varizellen", german_common: "Windpocken" },
    { id: 144, category: "Pediatri", latin: "Parotitis epidemica", english: "Mumps", turkish: "Kabakulak", german_medical: "Parotitis epidemica", german_common: "Mumps" },
    { id: 145, category: "Pediatri", latin: "Febrikrampf", english: "Febrile Seizure", turkish: "Ateşli Havale", german_medical: "Febrikrampf", german_common: "Fieberkrampf" },
    { id: 290, category: "Pediatri", latin: "Scharlach", english: "Scarlet Fever", turkish: "Kızıl", german_medical: "Scharlach", german_common: "Scharlach" },
    { id: 291, category: "Pediatri", latin: "Röteln", english: "Rubella", turkish: "Kızamıkçık", german_medical: "Röteln", german_common: "Röteln" },
    { id: 292, category: "Pediatri", latin: "Pylorusstenose", english: "Pyloric Stenosis", turkish: "Pilor Stenozu", german_medical: "Pylorusstenose", german_common: "Magenpförtnerverengung" },
    { id: 293, category: "Pediatri", latin: "ADHS", english: "ADHD", turkish: "DEHB", german_medical: "ADHS", german_common: "Aufmerksamkeitsdefizit-Hyperaktivitätsstörung" },
    { id: 294, category: "Pediatri", latin: "Invagination", english: "Intussusception", turkish: "İnvajinasyon", german_medical: "Invagination", german_common: "Darmeinstülpung" },
    { id: 295, category: "Pediatri", latin: "Epiglottitis", english: "Epiglottitis", turkish: "Epiglotit", german_medical: "Epiglottitis", german_common: "Kehldeckelentzündung" },
    { id: 296, category: "Pediatri", latin: "Fontanelle", english: "Fontanelle", turkish: "Bıngıldak", german_medical: "Fontanelle", german_common: "Fontanelle" },
    { id: 297, category: "Pediatri", latin: "Impfung", english: "Vaccination", turkish: "Aşı", german_medical: "Impfung", german_common: "Impfung" },
    { id: 298, category: "Pediatri", latin: "Neugeborenenikterus", english: "Neonatal Jaundice", turkish: "Yenidoğan Sarılığı", german_medical: "Neugeborenenikterus", german_common: "Neugeborenengelbsucht" },
    { id: 299, category: "Pediatri", latin: "Pseudokrupp", english: "Croup", turkish: "Yalancı Kuşpalazı", german_medical: "Pseudokrupp", german_common: "Pseudokrupp" },
    { id: 300, category: "Pediatri", latin: "Rachitis", english: "Rickets", turkish: "Raşitizm", german_medical: "Rachitis", german_common: "Knochenerweichung bei Kindern" },
    // --- Psikiyatri (Psychiatry) ---
    { id: 146, category: "Psikiyatri", latin: "Depression", english: "Depression", turkish: "Depresyon", german_medical: "Depression", german_common: "Depression" },
    { id: 147, category: "Psikiyatri", latin: "Phobie", english: "Phobia", turkish: "Fobi", german_medical: "Phobie", german_common: "Angststörung" },
    { id: 148, category: "Psikiyatri", latin: "Anorexia nervosa", english: "Anorexia Nervosa", turkish: "Anoreksiya", german_medical: "Anorexia nervosa", german_common: "Magersucht" },
    { id: 149, category: "Psikiyatri", latin: "Suizidversuch", english: "Suicide Attempt", turkish: "İntihar Girişimi", german_medical: "Suizidversuch", german_common: "Selbstmordversuch" },
    { id: 301, category: "Psikiyatri", latin: "Schizophrenie", english: "Schizophrenia", turkish: "Şizofreni", german_medical: "Schizophrenie", german_common: "Schizophrenie" },
    { id: 302, category: "Psikiyatri", latin: "Bipolare Störung", english: "Bipolar Disorder", turkish: "Bipolar Bozukluk", german_medical: "Bipolare Störung", german_common: "manisch-depressive Erkrankung" },
    { id: 303, category: "Psikiyatri", latin: "Panikattacke", english: "Panic Attack", turkish: "Panik Atak", german_medical: "Panikattacke", german_common: "Panikattacke" },
    { id: 304, category: "Psikiyatri", latin: "Zwangsstörung", english: "Obsessive-Compulsive Disorder", turkish: "Obsesif Kompulsif Bozukluk", german_medical: "Zwangsstörung", german_common: "Zwangsstörung" },
    { id: 305, category: "Psikiyatri", latin: "Posttraumatische Belastungsstörung (PTBS)", english: "PTSD", turkish: "Travma Sonrası Stres Bozukluğu", german_medical: "PTBS", german_common: "Posttraumatische Belastungsstörung" },
    { id: 306, category: "Psikiyatri", latin: "Bulimia nervosa", english: "Bulimia Nervosa", turkish: "Bulimia Nervoza", german_medical: "Bulimia nervosa", german_common: "Ess-Brech-Sucht" },
    { id: 307, category: "Psikiyatri", latin: "Abhängigkeit", english: "Addiction", turkish: "Bağımlılık", german_medical: "Abhängigkeit", german_common: "Sucht" },
    { id: 308, category: "Psikiyatri", latin: "Delir", english: "Delirium", turkish: "Deliryum", german_medical: "Delir", german_common: "Verwirrtheitszustand" },
    { id: 309, category: "Psikiyatri", latin: "Psychose", english: "Psychosis", turkish: "Psikoz", german_medical: "Psychose", german_common: "Geisteskrankheit" },
    { id: 310, category: "Psikiyatri", latin: "Halluzination", english: "Hallucination", turkish: "Halüsinasyon", german_medical: "Halluzination", german_common: "Sinnestäuschung" },
    { id: 311, category: "Psikiyatri", latin: "Wahn", english: "Delusion", turkish: "Sanrı", german_medical: "Wahn", german_common: "Wahnvorstellung" },
    // --- Üroloji (Urology) ---
    { id: 150, category: "Üroloji", latin: "Benigne Prostatahyperplasie", english: "Benign Prostatic Hyperplasia", turkish: "Prostat Büyümesi", german_medical: "Benigne Prostatahyperplasie", german_common: "gutartige Prostatavergrößerung" },
    { id: 151, category: "Üroloji", latin: "Niereninsuffizienz", english: "Renal Failure", turkish: "Böbrek Yetmezliği", german_medical: "Niereninsuffizienz", german_common: "Nierenversagen" },
    { id: 152, category: "Üroloji", latin: "Inkontinenz", english: "Incontinence", turkish: "İdrar Kaçırma", german_medical: "Inkontinenz", german_common: "Blasenschwäche" },
    { id: 153, category: "Üroloji", latin: "Harnverhalt", english: "Urinary Retention", turkish: "İdrar Yapamama", german_medical: "Harnverhalt", german_common: "Unfähigkeit, die Blase zu entleeren" },
    { id: 312, category: "Üroloji", latin: "Prostatitis", english: "Prostatitis", turkish: "Prostat İltihabı", german_medical: "Prostatitis", german_common: "Prostataentzündung" },
    { id: 313, category: "Üroloji", latin: "Urethritis", english: "Urethritis", turkish: "Üretra İltihabı", german_medical: "Urethritis", german_common: "Harnröhrenentzündung" },
    { id: 314, category: "Üroloji", latin: "Orchitis", english: "Orchitis", turkish: "Testis İltihabı", german_medical: "Orchitis", german_common: "Hodenentzündung" },
    { id: 315, category: "Üroloji", latin: "Hodentorsion", english: "Testicular Torsion", turkish: "Testis Torsiyonu", german_medical: "Hodentorsion", german_common: "Hodenverdrehung" },
    { id: 316, category: "Üroloji", latin: "Varikozele", english: "Varicocele", turkish: "Varikosel", german_medical: "Varikozele", german_common: "Krampfader am Hoden" },
    { id: 317, category: "Üroloji", latin: "Hydrozele", english: "Hydrocele", turkish: "Hidrosel", german_medical: "Hydrozele", german_common: "Wasserbruch" },
    { id: 318, category: "Üroloji", latin: "Phimose", english: "Phimosis", turkish: "Fimozis", german_medical: "Phimose", german_common: "Vorhautverengung" },
    { id: 319, category: "Üroloji", latin: "Erektile Dysfunktion", english: "Erectile Dysfunction", turkish: "Sertleşme Sorunu", german_medical: "Erektile Dysfunktion", german_common: "Erektionsstörung" },
    // --- Göz (Ophthalmology) ---
    { id: 154, category: "Göz", latin: "Katarakt", english: "Cataract", turkish: "Katarakt", german_medical: "Katarakt", german_common: "Grauer Star" },
    { id: 155, category: "Göz", latin: "Glaukom", english: "Glaucoma", turkish: "Göz Tansiyonu", german_medical: "Glaukom", german_common: "Grüner Star" },
    { id: 156, category: "Göz", latin: "Konjunktivitis", english: "Conjunctivitis", turkish: "Konjonktivit", german_medical: "Konjunktivitis", german_common: "Bindehautentzündung" },
    { id: 320, category: "Göz", latin: "Retinopathie", english: "Retinopathy", turkish: "Retinopati", german_medical: "Retinopathie", german_common: "Netzhauterkrankung" },
    { id: 321, category: "Göz", latin: "Amotio retinae", english: "Retinal Detachment", turkish: "Retina Dekolmanı", german_medical: "Amotio retinae", german_common: "Netzhautablösung" },
    { id: 322, category: "Göz", latin: "Makuladegeneration", english: "Macular Degeneration", turkish: "Makula Dejenerasyonu", german_medical: "Makuladegeneration", german_common: "Erkrankung der Netzhautmitte" },
    { id: 323, category: "Göz", latin: "Strabismus", english: "Strabismus", turkish: "Şaşılık", german_medical: "Strabismus", german_common: "Schielen" },
    { id: 324, category: "Göz", latin: "Myopie", english: "Nearsightedness", turkish: "Miyopi", german_medical: "Myopie", german_common: "Kurzsichtigkeit" },
    { id: 325, category: "Göz", latin: "Hyperopie", english: "Farsightedness", turkish: "Hipermetropi", german_medical: "Hyperopie", german_common: "Weitsichtigkeit" },
    { id: 326, category: "Göz", latin: "Astigmatismus", english: "Astigmatism", turkish: "Astigmat", german_medical: "Astigmatismus", german_common: "Hornhautverkrümmung" },
    { id: 327, category: "Göz", latin: "Blepharitis", english: "Blepharitis", turkish: "Göz Kapağı İltihabı", german_medical: "Blepharitis", german_common: "Lidrandentzündung" },
    { id: 328, category: "Göz", latin: "Hordeolum", english: "Stye", turkish: "Arpacık", german_medical: "Hordeolum", german_common: "Gerstenkorn" },
    // --- KBB (ENT) ---
    { id: 157, category: "KBB", latin: "Otitis Media", english: "Otitis Media", turkish: "Orta Kulak İltihabı", german_medical: "Otitis Media", german_common: "Mittelohrentzündung" },
    { id: 158, category: "KBB", latin: "Sinusitis", english: "Sinusitis", turkish: "Sinüzit", german_medical: "Sinusitis", german_common: "Nasennebenhöhlenentzündung" },
    { id: 159, category: "KBB", latin: "Tonsillitis", english: "Tonsillitis", turkish: "Bademcik İltihabı", german_medical: "Tonsillitis", german_common: "Mandelentzündung" },
    { id: 160, category: "KBB", latin: "Pharyngitis", english: "Pharyngitis", turkish: "Farenjit", german_medical: "Pharyngitis", german_common: "Rachenentzündung" },
    { id: 329, category: "KBB", latin: "Laryngitis", english: "Laryngitis", turkish: "Larenjit", german_medical: "Laryngitis", german_common: "Kehlkopfentzündung" },
    { id: 330, category: "KBB", latin: "Rhinitis", english: "Rhinitis", turkish: "Nezle", german_medical: "Rhinitis", german_common: "Schnupfen" },
    { id: 331, category: "KBB", latin: "Otitis externa", english: "Otitis Externa", turkish: "Dış Kulak İltihabı", german_medical: "Otitis externa", german_common: "Gehörgangsentzündung" },
    { id: 332, category: "KBB", latin: "Tympanonperforation", english: "Eardrum Perforation", turkish: "Kulak Zarı Delinmesi", german_medical: "Tympanonperforation", german_common: "Trommelfellriss" },
    { id: 333, category: "KBB", latin: "Hypakusis", english: "Hearing Loss", turkish: "İşitme Kaybı", german_medical: "Hypakusis", german_common: "Schwerhörigkeit" },
    { id: 334, category: "KBB", latin: "Zerumen", english: "Earwax", turkish: "Kulak Kiri", german_medical: "Zerumen", german_common: "Ohrenschmalz" },
    { id: 335, category: "KBB", latin: "Anosmie", english: "Anosmia", turkish: "Koku Alamama", german_medical: "Anosmie", german_common: "Verlust des Geruchssinns" },
    { id: 336, category: "KBB", latin: "Septumdeviation", english: "Deviated Septum", turkish: "Septum Deviasyonu", german_medical: "Septumdeviation", german_common: "Nasenscheidewandverkrümmung" },
    // --- Anatomi (Anatomy) ---
    { id: 51, category: "Anatomi", latin: "Thorax", english: "Chest", turkish: "Göğüs", german_medical: "Thorax", german_common: "Brustkorb" },
    { id: 52, category: "Anatomi", latin: "Abdomen", english: "Abdomen", turkish: "Karın", german_medical: "Abdomen", german_common: "Bauch" },
    { id: 53, category: "Anatomi", latin: "Kranium", english: "Cranium / Skull", turkish: "Kafatası", german_medical: "Kranium", german_common: "Schädel" },
    { id: 54, category: "Anatomi", latin: "Columna vertebralis", english: "Spine", turkish: "Omurga", german_medical: "Columna vertebralis", german_common: "Wirbelsäule" },
    { id: 55, category: "Anatomi", latin: "Pelvis", english: "Pelvis", turkish: "Leğen Kemiği", german_medical: "Pelvis", german_common: "Becken" },
    { id: 56, category: "Anatomi", latin: "Femur", english: "Femur", turkish: "Uyluk Kemiği", german_medical: "Femur", german_common: "Oberschenkelknochen" },
    { id: 57, category: "Anatomi", latin: "Hepar", english: "Liver", turkish: "Karaciğer", german_medical: "Hepar", german_common: "Leber" },
    { id: 58, category: "Anatomi", latin: "Cor", english: "Heart", turkish: "Kalp", german_medical: "Cor", german_common: "Herz" },
    { id: 59, category: "Anatomi", latin: "Pulmo", english: "Lung", turkish: "Akciğer", german_medical: "Pulmo", german_common: "Lunge" },
    { id: 60, category: "Anatomi", latin: "Cerebrum", english: "Brain", turkish: "Beyin", german_medical: "Cerebrum", german_common: "Gehirn" },
    { id: 99, category: "Anatomi", latin: "Gaster", english: "Stomach", turkish: "Mide", german_medical: "Gaster", german_common: "Magen" },
    { id: 100, category: "Anatomi", latin: "Ren", english: "Kidney", turkish: "Böbrek", german_medical: "Ren", german_common: "Niere" },
    { id: 101, category: "Anatomi", latin: "Vesica urinaria", english: "Bladder", turkish: "İdrar Kesesi", german_medical: "Vesica urinaria", german_common: "Harnblase" },
    { id: 102, category: "Anatomi", latin: "Cutis", english: "Skin", turkish: "Deri", german_medical: "Cutis", german_common: "Haut" },
    { id: 103, category: "Anatomi", latin: "Articulatio", english: "Joint", turkish: "Eklem", german_medical: "Articulatio", german_common: "Gelenk" },
    { id: 337, category: "Anatomi", latin: "Clavicula", english: "Collarbone", turkish: "Köprücük Kemiği", german_medical: "Clavicula", german_common: "Schlüsselbein" },
    { id: 338, category: "Anatomi", latin: "Scapula", english: "Shoulder Blade", turkish: "Kürek Kemiği", german_medical: "Scapula", german_common: "Schulterblatt" },
    { id: 339, category: "Anatomi", latin: "Humerus", english: "Humerus", turkish: "Pazu Kemiği", german_medical: "Humerus", german_common: "Oberarmknochen" },
    { id: 340, category: "Anatomi", latin: "Radius", english: "Radius", turkish: "Döner Kemik", german_medical: "Radius", german_common: "Speiche" },
    { id: 341, category: "Anatomi", latin: "Ulna", english: "Ulna", turkish: "Dirsek Kemiği", german_medical: "Ulna", german_common: "Elle" },
    { id: 342, category: "Anatomi", latin: "Sternum", english: "Breastbone", turkish: "Göğüs Kemiği", german_medical: "Sternum", german_common: "Brustbein" },
    { id: 343, category: "Anatomi", latin: "Costa", english: "Rib", turkish: "Kaburga", german_medical: "Costa", german_common: "Rippe" },
    { id: 344, category: "Anatomi", latin: "Patella", english: "Kneecap", turkish: "Diz Kapağı", german_medical: "Patella", german_common: "Kniescheibe" },
    { id: 345, category: "Anatomi", latin: "Tibia", english: "Shin Bone", turkish: "Kaval Kemiği", german_medical: "Tibia", german_common: "Schienbein" },
    { id: 346, category: "Anatomi", latin: "Fibula", english: "Fibula", turkish: "Baldır Kemiği", german_medical: "Fibula", german_common: "Wadenbein" },
    { id: 347, category: "Anatomi", latin: "Mandibula", english: "Lower Jaw", turkish: "Alt Çene", german_medical: "Mandibula", german_common: "Unterkiefer" },
    { id: 348, category: "Anatomi", latin: "Maxilla", english: "Upper Jaw", turkish: "Üst Çene", german_medical: "Maxilla", german_common: "Oberkiefer" },
    { id: 349, category: "Anatomi", latin: "Ösophagus", english: "Esophagus", turkish: "Yemek Borusu", german_medical: "Ösophagus", german_common: "Speiseröhre" },
    { id: 350, category: "Anatomi", latin: "Intestinum", english: "Intestine", turkish: "Bağırsak", german_medical: "Intestinum", german_common: "Darm" },
    { id: 351, category: "Anatomi", latin: "Colon", english: "Large Intestine", turkish: "Kalın Bağırsak", german_medical: "Colon", german_common: "Dickdarm" },
    { id: 352, category: "Anatomi", latin: "Pankreas", english: "Pancreas", turkish: "Pankreas", german_medical: "Pankreas", german_common: "Bauchspeicheldrüse" },
    { id: 353, category: "Anatomi", latin: "Lien", english: "Spleen", turkish: "Dalak", german_medical: "Lien", german_common: "Milz" },
    { id: 354, category: "Anatomi", latin: "Diaphragma", english: "Diaphragm", turkish: "Diyafram", german_medical: "Diaphragma", german_common: "Zwerchfell" },
    { id: 355, category: "Anatomi", latin: "Uterus", english: "Womb", turkish: "Rahim", german_medical: "Uterus", german_common: "Gebärmutter" },
    { id: 356, category: "Anatomi", latin: "Ovar", english: "Ovary", turkish: "Yumurtalık", german_medical: "Ovar", german_common: "Eierstock" },
    { id: 357, category: "Anatomi", latin: "Testis", english: "Testicle", turkish: "Testis", german_medical: "Testis", german_common: "Hoden" },
    { id: 358, category: "Anatomi", latin: "Vena", english: "Vein", turkish: "Toplardamar", german_medical: "Vena", german_common: "Vene" },
    { id: 359, category: "Anatomi", latin: "Arteria", english: "Artery", turkish: "Atardamar", german_medical: "Arteria", german_common: "Schlagader" },
    { id: 360, category: "Anatomi", latin: "Musculus", english: "Muscle", turkish: "Kas", german_medical: "Musculus", german_common: "Muskel" },
    { id: 361, category: "Anatomi", latin: "Tendo", english: "Tendon", turkish: "Tendon", german_medical: "Tendo", german_common: "Sehne" },
    { id: 362, category: "Anatomi", latin: "Lingua", english: "Tongue", turkish: "Dil", german_medical: "Lingua", german_common: "Zunge" },
    { id: 363, category: "Anatomi", latin: "Glandula thyreoidea", english: "Thyroid Gland", turkish: "Tiroid Bezi", german_medical: "Glandula thyreoidea", german_common: "Schilddrüse" },
    { id: 364, category: "Anatomi", latin: "Glandula suprarenalis", english: "Adrenal Gland", turkish: "Böbrek Üstü Bezi", german_medical: "Glandula suprarenalis", german_common: "Nebenniere" },
    // --- Tıbbi Aletler (Medical Instruments) ---
    { id: 61, category: "Aletler", latin: "Stethoskop", english: "Stethoscope", turkish: "Stetoskop", german_medical: "Stethoskop", german_common: "Hörrohr" },
    { id: 62, category: "Aletler", latin: "Skalpell", english: "Scalpel", turkish: "Neşter", german_medical: "Skalpell", german_common: "Operationsmesser" },
    { id: 63, category: "Aletler", latin: "Spritze", english: "Syringe", turkish: "Şırınga", german_medical: "Spritze", german_common: "Spritze" },
    { id: 64, category: "Aletler", latin: "Kanüle", english: "Cannula", turkish: "Kanül", german_medical: "Verweilkanüle", german_common: "Braunüle" },
    { id: 65, category: "Aletler", latin: "Katheter", english: "Catheter", turkish: "Kateter", german_medical: "Katheter", german_common: "Katheter" },
    { id: 66, category: "Aletler", latin: "Pinzette", english: "Tweezers / Forceps", turkish: "Penset", german_medical: "Pinzette", german_common: "Pinzette" },
    { id: 67, category: "Aletler", latin: "EKG-Gerät", english: "ECG Machine", turkish: "EKG Cihazı", german_medical: "EKG-Gerät", german_common: "Herzstrommessgerät" },
    { id: 68, category: "Aletler", latin: "Blutdruckmessgerät", english: "Sphygmomanometer", turkish: "Tansiyon Aleti", german_medical: "Blutdruckmessgerät", german_common: "Blutdruckmessgerät" },
    { id: 69, category: "Aletler", latin: "Ultraschallgerät", english: "Ultrasound Machine", turkish: "Ultrason Cihazı", german_medical: "Ultraschallgerät", german_common: "Ultraschallgerät" },
    { id: 70, category: "Aletler", latin: "Defibrillator", english: "Defibrillator", turkish: "Defibrilatör", german_medical: "Defibrillator", german_common: "Defi / Schockgeber" },
    { id: 365, category: "Aletler", latin: "Otoskop", english: "Otoscope", turkish: "Otoskop", german_medical: "Otoskop", german_common: "Ohrenspiegel" },
    { id: 366, category: "Aletler", latin: "Ophthalmoskop", english: "Ophthalmoscope", turkish: "Oftalmoskop", german_medical: "Ophthalmoskop", german_common: "Augenspiegel" },
    { id: 367, category: "Aletler", latin: "Endoskop", english: "Endoscope", turkish: "Endoskop", german_medical: "Endoskop", german_common: "Spiegelungsinstrument" },
    { id: 368, category: "Aletler", latin: "Klemme", english: "Clamp", turkish: "Klemp", german_medical: "Klemme", german_common: "Klemme" },
    { id: 369, category: "Aletler", latin: "Schere", english: "Scissors", turkish: "Makas", german_medical: "Schere", german_common: "Schere" },
    { id: 370, category: "Aletler", latin: "Nadelhalter", english: "Needle Holder", turkish: "Portegü", german_medical: "Nadelhalter", german_common: "Nadelhalter" },
    { id: 371, category: "Aletler", latin: "Drainage", english: "Drain", turkish: "Dren", german_medical: "Drainage", german_common: "Ableitungsschlauch" },
    { id: 372, category: "Aletler", latin: "Gipsverband", english: "Plaster Cast", turkish: "Alçı", german_medical: "Gipsverband", german_common: "Gips" },
    { id: 373, category: "Aletler", latin: "Rollstuhl", english: "Wheelchair", turkish: "Tekerlekli Sandalye", german_medical: "Rollstuhl", german_common: "Rollstuhl" },
    { id: 374, category: "Aletler", latin: "Infusionsständer", english: "IV Pole", turkish: "Serum Askısı", german_medical: "Infusionsständer", german_common: "Infusionsständer" },
    // --- Farmakoloji (Pharmacology) ---
    { id: 104, category: "Farmakoloji", latin: "Analgetikum", english: "Analgesic", turkish: "Ağrı Kesici", german_medical: "Analgetikum", german_common: "Schmerzmittel" },
    { id: 105, category: "Farmakoloji", latin: "Antibiotikum", english: "Antibiotic", turkish: "Antibiyotik", german_medical: "Antibiotikum", german_common: "Mittel gegen Bakterien" },
    { id: 106, category: "Farmakoloji", latin: "Antihypertensivum", english: "Antihypertensive", turkish: "Tansiyon İlacı", german_medical: "Antihypertensivum", german_common: "Blutdrucksenker" },
    { id: 107, category: "Farmakoloji", latin: "Antidepressivum", english: "Antidepressant", turkish: "Antidepresan", german_medical: "Antidepressivum", german_common: "Mittel gegen Depressionen" },
    { id: 108, category: "Farmakoloji", latin: "Diuretikum", english: "Diuretic", turkish: "İdrar Söktürücü", german_medical: "Diuretikum", german_common: "Wassertablette" },
    { id: 109, category: "Farmakoloji", latin: "Antikoagulans", english: "Anticoagulant", turkish: "Kan Sulandırıcı", german_medical: "Antikoagulans", german_common: "Blutverdünner" },
    { id: 110, category: "Farmakoloji", latin: "Sedativum", english: "Sedative", turkish: "Sakinleştirici", german_medical: "Sedativum", german_common: "Beruhigungsmittel" },
    { id: 111, category: "Farmakoloji", latin: "Laxans", english: "Laxative", turkish: "Müshil", german_medical: "Laxans", german_common: "Abführmittel" },
    { id: 112, category: "Farmakoloji", latin: "Antipyretikum", english: "Antipyretic", turkish: "Ateş Düşürücü", german_medical: "Antipyretikum", german_common: "Fiebersenker" },
    { id: 113, category: "Farmakoloji", latin: "Kontrazeptivum", english: "Contraceptive", turkish: "Doğum Kontrol Hapı", german_medical: "Kontrazeptivum", german_common: "Verhütungsmittel" },
    { id: 375, category: "Farmakoloji", latin: "Antiemetikum", english: "Antiemetic", turkish: "Bulantı Önleyici", german_medical: "Antiemetikum", german_common: "Mittel gegen Übelkeit" },
    { id: 376, category: "Farmakoloji", latin: "Antihistaminikum", english: "Antihistamine", turkish: "Alerji İlacı", german_medical: "Antihistaminikum", german_common: "Mittel gegen Allergien" },
    { id: 377, category: "Farmakoloji", latin: "Betablocker", english: "Beta Blocker", turkish: "Beta Bloker", german_medical: "Betablocker", german_common: "Betablocker" },
    { id: 378, category: "Farmakoloji", latin: "ACE-Hemmer", english: "ACE Inhibitor", turkish: "ACE İnhibitörü", german_medical: "ACE-Hemmer", german_common: "ACE-Hemmer" },
    { id: 379, category: "Farmakoloji", latin: "Statin", english: "Statin", turkish: "Statin", german_medical: "Statin", german_common: "Cholesterinsenker" },
    { id: 380, category: "Farmakoloji", latin: "Protonenpumpeninhibitor (PPI)", english: "Proton Pump Inhibitor", turkish: "Proton Pompa İnhibitörü", german_medical: "PPI", german_common: "Magenschutz" },
    { id: 381, category: "Farmakoloji", latin: "NSAR (Nichtsteroidales Antirheumatikum)", english: "NSAID", turkish: "NSAİİ", german_medical: "NSAR", german_common: "Entzündungshemmer" },
    { id: 382, category: "Farmakoloji", latin: "Kortikosteroid", english: "Corticosteroid", turkish: "Kortikosteroid", german_medical: "Kortikosteroid", german_common: "Kortison" },
    { id: 383, category: "Farmakoloji", latin: "Anxiolytikum", english: "Anxiolytic", turkish: "Anksiyete Giderici", german_medical: "Anxiolytikum", german_common: "angstlösendes Mittel" },
    { id: 384, category: "Farmakoloji", latin: "Antimykotikum", english: "Antifungal", turkish: "Mantar İlacı", german_medical: "Antimykotikum", german_common: "Mittel gegen Pilze" },
    { id: 385, category: "Farmakoloji", latin: "Virostatikum", english: "Antiviral", turkish: "Antiviral İlaç", german_medical: "Virostatikum", german_common: "Mittel gegen Viren" },
    { id: 386, category: "Farmakoloji", latin: "Hypnotikum", english: "Hypnotic", turkish: "Uyku İlacı", german_medical: "Hypnotikum", german_common: "Schlafmittel" },
    { id: 387, category: "Farmakoloji", latin: "Bronchodilatator", english: "Bronchodilator", turkish: "Bronkodilatör", german_medical: "Bronchodilatator", german_common: "Mittel zur Erweiterung der Bronchien" },
    { id: 388, category: "Farmakoloji", latin: "Zytostatikum", english: "Cytostatic", turkish: "Kemoterapi İlacı", german_medical: "Zytostatikum", german_common: "Zellwachstumshemmer" },
    { id: 389, category: "Farmakoloji", latin: "Immunsuppressivum", english: "Immunosuppressant", turkish: "Bağımsızlık Baskılayıcı", german_medical: "Immunsuppressivum", german_common: "Mittel zur Unterdrückung des Immunsystems" },
    { id: 390, category: "Farmakoloji", latin: "Lokalanästhetikum", english: "Local Anesthetic", turkish: "Lokal Anestezik", german_medical: "Lokalanästhetikum", german_common: "örtliches Betäubungsmittel" },
    // --- Prosedürler ve Tetkikler (Verfahren und Untersuchungen) ---
    { id: 114, category: "Prosedürler", latin: "Biopsie", english: "Biopsy", turkish: "Biyopsi", german_medical: "Biopsie", german_common: "Gewebeentnahme" },
    { id: 115, category: "Prosedürler", latin: "Endoskopie", english: "Endoscopy", turkish: "Endoskopi", german_medical: "Endoskopie", german_common: "Spiegelung" },
    { id: 116, category: "Prosedürler", latin: "Gastroskopie", english: "Gastroscopy", turkish: "Gastroskopi", german_medical: "Gastroskopie", german_common: "Magenspiegelung" },
    { id: 117, category: "Prosedürler", latin: "Koloskopie", english: "Colonoscopy", turkish: "Kolonoskopi", german_medical: "Koloskopie", german_common: "Darmspiegelung" },
    { id: 118, category: "Prosedürler", latin: "Laparoskopie", english: "Laparoscopy", turkish: "Laparoskopi", german_medical: "Laparoskopie", german_common: "Bauchspiegelung" },
    { id: 119, category: "Prosedürler", latin: "EKG (Elektrokardiogramm)", english: "ECG", turkish: "EKG", german_medical: "EKG", german_common: "Herzstromkurve" },
    { id: 120, category: "Prosedürler", latin: "EEG (Elektroenzephalogramm)", english: "EEG", turkish: "EEG", german_medical: "EEG", german_common: "Hirnstrommessung" },
    { id: 121, category: "Prosedürler", latin: "CT (Computertomographie)", english: "CT Scan", turkish: "Bilgisayarlı Tomografi", german_medical: "CT", german_common: "Schichtröntgen" },
    { id: 122, category: "Prosedürler", latin: "MRT (Magnetresonanztomographie)", english: "MRI", turkish: "MR", german_medical: "MRT", german_common: "Kernspintomographie" },
    { id: 123, category: "Prosedürler", latin: "Intubation", english: "Intubation", turkish: "Entübasyon", german_medical: "Intubation", german_common: "Einführung eines Beatmungsschlauches" },
    { id: 124, category: "Prosedürler", latin: "Transfusion", english: "Transfusion", turkish: "Kan Nakli", german_medical: "Transfusion", german_common: "Blutübertragung" },
    { id: 125, category: "Prosedürler", latin: "Sonographie", english: "Sonography", turkish: "Ultrason", german_medical: "Sonographie", german_common: "Ultraschalluntersuchung" },
    { id: 391, category: "Prosedürler", latin: "Lumbalpunktion", english: "Lumbar Puncture", turkish: "Belden Sıvı Alma", german_medical: "Lumbalpunktion", german_common: "Nervenwasserentnahme" },
    { id: 392, category: "Prosedürler", latin: "Bronchoskopie", english: "Bronchoscopy", turkish: "Bronkoskopi", german_medical: "Bronchoskopie", german_common: "Lungenspiegelung" },
    { id: 393, category: "Prosedürler", latin: "Zystoskopie", english: "Cystoscopy", turkish: "Sistoskopi", german_medical: "Zystoskopie", german_common: "Blasenspiegelung" },
    { id: 394, category: "Prosedürler", latin: "Angiographie", english: "Angiography", turkish: "Anjiyografi", german_medical: "Angiographie", german_common: "Gefäßdarstellung" },
    { id: 395, category: "Prosedürler", latin: "Chemotherapie", english: "Chemotherapy", turkish: "Kemoterapi", german_medical: "Chemotherapie", german_common: "Chemotherapie" },
    { id: 396, category: "Prosedürler", latin: "Radiotherapie", english: "Radiotherapy", turkish: "Radyoterapi", german_medical: "Radiotherapie", german_common: "Strahlentherapie" },
    { id: 397, category: "Prosedürler", latin: "Dialyse", english: "Dialysis", turkish: "Diyaliz", german_medical: "Dialyse", german_common: "Blutwäsche" },
    { id: 398, category: "Prosedürler", latin: "Reanimation", english: "Resuscitation", turkish: "Yeniden Canlandırma", german_medical: "Reanimation", german_common: "Wiederbelebung" },
    { id: 399, category: "Prosedürler", latin: "Kardioversion", english: "Cardioversion", turkish: "Kardiyoversiyon", german_medical: "Kardioversion", german_common: "Elektroschocktherapie am Herzen" },
    { id: 400, category: "Prosedürler", latin: "Auskultation", english: "Auscultation", turkish: "Dinleme (Stetoskopla)", german_medical: "Auskultation", german_common: "Abhören" },
    { id: 401, category: "Prosedürler", latin: "Palpation", english: "Palpation", turkish: "Elle Muayene", german_medical: "Palpation", german_common: "Abtasten" },
    { id: 402, category: "Prosedürler", latin: "Perkussion", english: "Percussion", turkish: "Vurarak Muayene", german_medical: "Perkussion", german_common: "Abklopfen" },
    { id: 403, category: "Prosedürler", latin: "Inzision", english: "Incision", turkish: "Kesi", german_medical: "Inzision", german_common: "Einschnitt" },
    { id: 404, category: "Prosedürler", latin: "Exzision", english: "Excision", turkish: "Çıkarma (Cerrahi)", german_medical: "Exzision", german_common: "Herausschneiden" },
    { id: 405, category: "Prosedürler", latin: "Anamnese", english: "Anamnesis", turkish: "Hasta Öyküsü", german_medical: "Anamnese", german_common: "Krankengeschichte" },
    { id: 406, category: "Prosedürler", latin: "Diagnose", english: "Diagnosis", turkish: "Tanı", german_medical: "Diagnose", german_common: "Diagnose" },
    { id: 407, category: "Prosedürler", latin: "Prognose", english: "Prognosis", turkish: "Hastalığın Gidişatı", german_medical: "Prognose", german_common: "Vorhersage" },
    { id: 408, category: "Prosedürler", latin: "Therapie", english: "Therapy", turkish: "Tedavi", german_medical: "Therapie", german_common: "Behandlung" },
    { id: 409, category: "Prosedürler", latin: "Prävention", english: "Prevention", turkish: "Önleme", german_medical: "Prävention", german_common: "Vorbeugung" },
    { id: 410, category: "Prosedürler", latin: "Injektion", english: "Injection", turkish: "Enjeksiyon", german_medical: "Injektion", german_common: "Spritze" },
    { id: 411, category: "Prosedürler", latin: "Infusion", english: "Infusion", turkish: "İnfüzyon", german_medical: "Infusion", german_common: "Infusion" },
    { id: 412, category: "Prosedürler", latin: "Punktion", english: "Puncture", turkish: "Ponksiyon", german_medical: "Punktion", german_common: "Einstich zur Flüssigkeitsentnahme" },
    // --- NEW TERMS START HERE ---
    { id: 413, category: "Semptomlar", latin: "Claudicatio intermittens", english: "Intermittent Claudication", turkish: "Aralıklı Topallama", german_medical: "Claudicatio intermittens", german_common: "Schaufensterkrankheit" },
    { id: 414, category: "Semptomlar", latin: "Rigor", english: "Rigidity", turkish: "Katılık", german_medical: "Rigor", german_common: "Muskelsteifheit" },
    { id: 415, category: "Semptomlar", latin: "Apathie", english: "Apathy", turkish: "İlgisizlik, Kayıtsızlık", german_medical: "Apathie", german_common: "Teilnahmslosigkeit" },
    { id: 416, category: "Semptomlar", latin: "Anhidrose", english: "Anhidrosis", turkish: "Terleyememe", german_medical: "Anhidrose", german_common: "fehlendes Schwitzen" },
    { id: 417, category: "Semptomlar", latin: "Epiphora", english: "Excessive tearing", turkish: "Aşırı Göz Yaşarması", german_medical: "Epiphora", german_common: "Tränenträufeln" },
    { id: 418, category: "Dahiliye", latin: "Laktoseintoleranz", english: "Lactose intolerance", turkish: "Laktoz intoleransı", german_medical: "Laktoseintoleranz", german_common: "Milchzuckerunverträglichkeit" },
    { id: 419, category: "Dahiliye", latin: "Hämorrhoiden", english: "Hemorrhoids", turkish: "Hemoroid", german_medical: "Hämorrhoidalleiden", german_common: "Hämorrhoiden" },
    { id: 420, category: "Dahiliye", latin: "Schlafapnoe-Syndrom", english: "Sleep apnea syndrome", turkish: "Uyku apnesi", german_medical: "Schlafapnoe-Syndrom", german_common: "Atemaussetzer im Schlaf" },
    { id: 421, category: "Dahiliye", latin: "Steatosis hepatis", english: "Fatty liver disease", turkish: "Karaciğer yağlanması", german_medical: "Steatosis hepatis", german_common: "Fettleber" },
    { id: 422, category: "Dahiliye", latin: "Reizdarmsyndrom", english: "Irritable bowel syndrome", turkish: "Hassas bağırsak sendromu", german_medical: "Reizdarmsyndrom", german_common: "Reizdarm" },
    { id: 423, category: "Kardiyoloji", latin: "Aortenstenose", english: "Aortic stenosis", turkish: "Aort darlığı", german_medical: "Aortenstenose", german_common: "Verengung der Aortenklappe" },
    { id: 424, category: "Kardiyoloji", latin: "Extrasystole", english: "Extrasystole", turkish: "Ekstra atım", german_medical: "Extrasystole", german_common: "Herzstolpern" },
    { id: 425, category: "Kardiyoloji", latin: "Kardiogener Schock", english: "Cardiogenic shock", turkish: "Kardiyojenik şok", german_medical: "Kardiogener Schock", german_common: "Herz-Kreislauf-Schock" },
    { id: 426, category: "Kardiyoloji", latin: "Hypercholesterinämie", english: "Hypercholesterolemia", turkish: "Yüksek kolesterol", german_medical: "Hypercholesterinämie", german_common: "zu hoher Cholesterinspiegel" },
    { id: 427, category: "Kardiyoloji", latin: "Marfan-Syndrom", english: "Marfan syndrome", turkish: "Marfan sendromu", german_medical: "Marfan-Syndrom", german_common: "Marfan-Syndrom" },
    { id: 428, category: "Nöroloji", latin: "Spastik", english: "Spasticity", turkish: "Spastisite", german_medical: "Spastik", german_common: "Muskelkrampf" },
    { id: 429, category: "Nöroloji", latin: "Nystagmus", english: "Nystagmus", turkish: "Göz titremesi", german_medical: "Nystagmus", german_common: "Augenzittern" },
    { id: 430, category: "Nöroloji", latin: "Hemiparese", english: "Hemiparesis", turkish: "Yarı felç", german_medical: "Hemiparese", german_common: "Halbseitenlähmung" },
    { id: 431, category: "Nöroloji", latin: "Aneurysma", english: "Aneurysm", turkish: "Anevrizma, baloncuk", german_medical: "Aneurysma", german_common: "Gefäßaussackung" },
    { id: 432, category: "Nöroloji", latin: "Bandscheibenprotrusion", english: "Disc protrusion", turkish: "Fıtık başlangıcı", german_medical: "Bandscheibenprotrusion", german_common: "Bandscheibenvorwölbung" },
    { id: 433, category: "Cerrahi", latin: "Volvulus", english: "Volvulus", turkish: "Bağırsak düğümlenmesi", german_medical: "Volvulus", german_common: "Darmverdrehung" },
    { id: 434, category: "Cerrahi", latin: "Wundruptur", english: "Wound rupture", turkish: "Yara açılması", german_medical: "Wundruptur", german_common: "Aufplatzen einer Wunde" },
    { id: 435, category: "Cerrahi", latin: "Dekubitus", english: "Pressure ulcer", turkish: "Yatak yarası", german_medical: "Dekubitus", german_common: "Wundliegen" },
    { id: 436, category: "Cerrahi", latin: "Narbenhernie", english: "Incisional hernia", turkish: "Kesi fıtığı", german_medical: "Narbenhernie", german_common: "Narbenbruch" },
    { id: 437, category: "Cerrahi", latin: "Stoma", english: "Stoma", turkish: "Stoma", german_medical: "Stoma", german_common: "künstlicher Darmausgang" },
    { id: 438, category: "Ortopedi", latin: "Gonalgie", english: "Knee pain", turkish: "Diz ağrısı", german_medical: "Gonalgie", german_common: "Knieschmerz" },
    { id: 439, category: "Ortopedi", latin: "Koxalgie", english: "Hip pain", turkish: "Kalça ağrısı", german_medical: "Koxalgie", german_common: "Hüftschmerz" },
    { id: 440, category: "Ortopedi", latin: "Achillodynie", english: "Achilles tendinitis", turkish: "Aşil tendiniti", german_medical: "Achillodynie", german_common: "Schmerzen der Achillessehne" },
    { id: 441, category: "Ortopedi", latin: "Plantarfasziitis", english: "Plantar fasciitis", turkish: "Topuk dikeni", german_medical: "Plantarfasziitis", german_common: "Fersensporn" },
    { id: 442, category: "Ortopedi", latin: "Kompartmentsyndrom", english: "Compartment syndrome", turkish: "Kompartman sendromu", german_medical: "Kompartmentsyndrom", german_common: "erhöhter Gewebedruck" },
    { id: 443, category: "Dermatoloji", latin: "Vitiligo", english: "Vitiligo", turkish: "Vitiligo", german_medical: "Vitiligo", german_common: "Weißfleckenkrankheit" },
    { id: 444, category: "Dermatoloji", latin: "Seborrhoisches Ekzem", english: "Seborrhoeic dermatitis", turkish: "Seboreik dermatit", german_medical: "Seborrhoisches Ekzem", german_common: "seborrhoisches Ekzem" },
    { id: 445, category: "Dermatoloji", latin: "Kontaktdermatitis", english: "Contact dermatitis", turkish: "Kontakt dermatit", german_medical: "Kontaktdermatitis", german_common: "Kontaktekzem" },
    { id: 446, category: "Dermatoloji", latin: "Bulla", english: "Blister", turkish: "Bül, su kabarcığı", german_medical: "Bulla", german_common: "Hautblase" },
    { id: 447, category: "Dermatoloji", latin: "Ulcus cruris", english: "Leg ulcer", turkish: "Bacak ülseri", german_medical: "Ulcus cruris", german_common: "offenes Bein" },
    { id: 448, category: "Jinekoloji", latin: "Oophoritis", english: "Oophoritis", turkish: "Yumurtalık iltihabı", german_medical: "Oophoritis", german_common: "Eierstockentzündung" },
    { id: 449, category: "Jinekoloji", latin: "Mammaaugmentation", english: "Breast augmentation", turkish: "Göğüs büyütme", german_medical: "Mammaaugmentation", german_common: "Brustvergrößerung" },
    { id: 450, category: "Jinekoloji", latin: "Infertilität", english: "Infertility", turkish: "Kısırlık", german_medical: "Infertilität", german_common: "Unfruchtbarkeit" },
    { id: 451, category: "Jinekoloji", latin: "Zervixkarzinom", english: "Cervical cancer", turkish: "Rahim ağzı kanseri", german_medical: "Zervixkarzinom", german_common: "Gebärmutterhalskrebs" },
    { id: 452, category: "Jinekoloji", latin: "Abruptio placentae", english: "Placental abruption", turkish: "Plasentanın erken ayrılması", german_medical: "Abruptio placentae", german_common: "vorzeitige Plazentalösung" },
    { id: 453, category: "Pediatri", latin: "Spina bifida", english: "Spina bifida", turkish: "Spina bifida", german_medical: "Spina bifida", german_common: "offener Rücken" },
    { id: 454, category: "Pediatri", latin: "Hydrops fetalis", english: "Hydrops fetalis", turkish: "Hidrops fetalis", german_medical: "Hydrops fetalis", german_common: "Flüssigkeitsansammlung beim Fötus" },
    { id: 455, category: "Pediatri", latin: "Mukopolysaccharidose", english: "Mucopolysaccharidosis", turkish: "Mukopolisakkaridoz", german_medical: "Mukopolysaccharidose", german_common: "Speicherkrankheit" },
    { id: 456, category: "Pediatri", latin: "Konnatale Syphilis", english: "Congenital syphilis", turkish: "Konjenital sifiliz", german_medical: "Konnatale Syphilis", german_common: "angeborene Syphilis" },
    { id: 457, category: "Pediatri", latin: "Plötzlicher Kindstod", english: "Sudden infant death syndrome", turkish: "Ani bebek ölümü", german_medical: "Plötzlicher Kindstod", german_common: "plötzlicher Kindstod" },
    { id: 458, category: "Psikiyatri", latin: "Somatisierungsstörung", english: "Somatization disorder", turkish: "Somatizasyon bozukluğu", german_medical: "Somatisierungsstörung", german_common: "körperliche Beschwerden ohne Befund" },
    { id: 459, category: "Psikiyatri", latin: "Agoraphobie", english: "Agoraphobia", turkish: "Agorafobi", german_medical: "Agoraphobie", german_common: "Platzangst" },
    { id: 460, category: "Psikiyatri", latin: "Klaustrophobie", english: "Claustrophobia", turkish: "Klostrofobi", german_medical: "Klaustrophobie", german_common: "Angst vor engen Räumen" },
    { id: 461, category: "Psikiyatri", latin: "Burnout-Syndrom", english: "Burnout syndrome", turkish: "Tükenmişlik sendromu", german_medical: "Burnout-Syndrom", german_common: "Ausgebranntsein" },
    { id: 462, category: "Psikiyatri", latin: "Persönlichkeitsstörung", english: "Personality disorder", turkish: "Kişilik bozukluğu", german_medical: "Persönlichkeitsstörung", german_common: "Persönlichkeitsstörung" },
    { id: 463, category: "Üroloji", latin: "Glomerulonephritis", english: "Glomerulonephritis", turkish: "Glomerulonefrit", german_medical: "Glomerulonephritis", german_common: "Entzündung der Nierenkörperchen" },
    { id: 464, category: "Üroloji", latin: "Balanitis", english: "Balanitis", turkish: "Glans penisin iltihabı", german_medical: "Balanitis", german_common: "Eichelentzündung" },
    { id: 465, category: "Üroloji", latin: "Priapismus", english: "Priapism", turkish: "Priapizm", german_medical: "Priapismus", german_common: "schmerzhafte Dauererektion" },
    { id: 466, category: "Üroloji", latin: "Epididymitis", english: "Epididymitis", turkish: "Epididim iltihabı", german_medical: "Epididymitis", german_common: "Nebenhodenentzündung" },
    { id: 467, category: "Üroloji", latin: "Uroflowmetrie", english: "Uroflowmetry", turkish: "İdrar akım testi", german_medical: "Uroflowmetrie", german_common: "Harnstrahlmessung" },
    { id: 468, category: "Göz", latin: "Keratitis", english: "Keratitis", turkish: "Kornea iltihabı", german_medical: "Keratitis", german_common: "Hornhautentzündung" },
    { id: 469, category: "Göz", latin: "Uveitis", english: "Uveitis", turkish: "Uveit", german_medical: "Uveitis", german_common: "Entzündung der mittleren Augenhaut" },
    { id: 470, category: "Göz", latin: "Chalazion", english: "Chalazion", turkish: "Şalazyon", german_medical: "Chalazion", german_common: "Hagelkorn" },
    { id: 471, category: "Göz", latin: "Presbyopie", english: "Presbyopia", turkish: "Yaşa bağlı yakını görememe", german_medical: "Presbyopie", german_common: "Alterssichtigkeit" },
    { id: 472, category: "Göz", latin: "Exophthalmus", english: "Exophthalmos", turkish: "Gözlerin öne çıkması", german_medical: "Exophthalmus", german_common: "Hervortreten des Augapfels" },
    { id: 473, category: "KBB", latin: "Mastoiditis", english: "Mastoiditis", turkish: "Mastoidit", german_medical: "Mastoiditis", german_common: "Warzenfortsatzentzündung" },
    { id: 474, category: "KBB", latin: "Audiometrie", english: "Audiometry", turkish: "İşitme testi", german_medical: "Audiometrie", german_common: "Hörtest" },
    { id: 475, category: "KBB", latin: "Stridor", english: "Stridor", turkish: "Stridor (Tiz sesli solunum)", german_medical: "Stridor", german_common: "pfeifendes Atemgeräusch" },
    { id: 476, category: "KBB", latin: "Pollinosis", english: "Hay fever", turkish: "Saman nezlesi", german_medical: "Pollinosis", german_common: "Heuschnupfen" },
    { id: 477, category: "KBB", latin: "Cerumen obturans", english: "Impacted earwax", turkish: "Kulak tıkacı", german_medical: "Cerumen obturans", german_common: "Ohrenschmalzpfropf" },
    { id: 478, category: "Anatomi", latin: "Malleolus", english: "Malleolus", turkish: "Ayak bileği kemiği", german_medical: "Malleolus", german_common: "Fußknöchel" },
    { id: 479, category: "Anatomi", latin: "Phalanx", english: "Phalanx", turkish: "Parmak kemiği", german_medical: "Phalanx", german_common: "Fingerknochen / Zehenknochen" },
    { id: 480, category: "Anatomi", latin: "Os sacrum", english: "Sacrum", turkish: "Kuyruk sokumu kemiği", german_medical: "Os sacrum", german_common: "Kreuzbein" },
    { id: 481, category: "Anatomi", latin: "Os coccygis", english: "Coccyx", turkish: "Koksiks", german_medical: "Os coccygis", german_common: "Steißbein" },
    { id: 482, category: "Anatomi", latin: "Trachea", english: "Trachea", turkish: "Soluk borusu", german_medical: "Trachea", german_common: "Luftröhre" },
    { id: 483, category: "Aletler", latin: "Reflexhammer", english: "Reflex hammer", turkish: "Refleks çekici", german_medical: "Reflexhammer", german_common: "Reflexhammer" },
    { id: 484, category: "Aletler", latin: "Zungenspatel", english: "Tongue depressor", turkish: "Dil basacağı", german_medical: "Zungenspatel", german_common: "Mundspatel" },
    { id: 485, category: "Aletler", latin: "Tourniquet", english: "Tourniquet", turkish: "Turnike", german_medical: "Tourniquet", german_common: "Staubinde" },
    { id: 486, category: "Aletler", latin: "Vaginalspekulum", english: "Vaginal speculum", turkish: "Vajinal spekulum", german_medical: "Vaginalspekulum", german_common: "Scheidenspiegel" },
    { id: 487, category: "Aletler", latin: "Nierenschale", english: "Kidney dish", turkish: "Böbrek küvet", german_medical: "Nierenschale", german_common: "Nierenschale" },
    { id: 488, category: "Farmakoloji", latin: "Antazidum", english: "Antacid", turkish: "Mide asidi giderici", german_medical: "Antazidum", german_common: "Mittel gegen Sodbrennen" },
    { id: 489, category: "Farmakoloji", latin: "Mukolytikum", english: "Mucolytic", turkish: "Balgam söktürücü", german_medical: "Mukolytikum", german_common: "Schleimlöser" },
    { id: 490, category: "Farmakoloji", latin: "Antitussivum", english: "Antitussive", turkish: "Öksürük kesici", german_medical: "Antitussivum", german_common: "Hustenstiller" },
    { id: 491, category: "Farmakoloji", latin: "Antidiarrhoikum", english: "Antidiarrheal", turkish: "İshal kesici", german_medical: "Antidiarrhoikum", german_common: "Mittel gegen Durchfall" },
    { id: 492, category: "Farmakoloji", latin: "Spasmolytikum", english: "Antispasmodic", turkish: "Spazm çözücü", german_medical: "Spasmolytikum", german_common: "krampflösendes Mittel" },
    { id: 493, category: "Farmakoloji", latin: "Thrombozytenaggregationshemmer", english: "Platelet aggregation inhibitor", turkish: "Trombosit kümelenme önleyici", german_medical: "Thrombozytenaggregationshemmer", german_common: "Blutplättchen-Hemmer" },
    { id: 494, category: "Prosedürler", latin: "Defäkation", english: "Defecation", turkish: "Dışkılama", german_medical: "Defäkation", german_common: "Stuhlgang" },
    { id: 495, category: "Prosedürler", latin: "Miktion", english: "Micturition", turkish: "İdrar yapma", german_medical: "Miktion", german_common: "Wasserlassen" },
    { id: 496, category: "Prosedürler", latin: "Exsikkose", english: "Dehydration", turkish: "Sıvı kaybı", german_medical: "Exsikkose", german_common: "Austrocknung" },
    { id: 497, category: "Prosedürler", latin: "Adipositas", english: "Obesity", turkish: "Obezite", german_medical: "Adipositas", german_common: "Fettleibigkeit" },
    { id: 498, category: "Prosedürler", latin: "Abrasio", english: "Curettage", turkish: "Küretaj", german_medical: "Abrasio", german_common: "Ausschabung" },
    { id: 499, category: "Prosedürler", latin: "Vasektomie", english: "Vasectomy", turkish: "Vazektomi", german_medical: "Vasektomie", german_common: "Sterilisation des Mannes" },
    { id: 500, category: "Prosedürler", latin: "Ligatur", english: "Ligation", turkish: "Bağlama", german_medical: "Ligatur", german_common: "Unterbindung" }
];

export const ARZTBRIEF_TEMPLATES = {
    'Giriş (Einleitung)': [
        { label: 'Standart Giriş', text: 'Wir berichten über den/die [Alter]-jährige/n Patienten/Patientin [Name], der/die sich am [Datum] aufgrund von [Symptom] in unserer Notaufnahme vorstellte.\n' },
        { label: 'Acil Durum Girişi', text: 'Der/Die [Alter]-jährige/r Patient/in [Name] wurde am [Datum] mit dem Rettungsdienst bei Zustand nach [Ereignis] in unsere Notaufnahme eingeliefert.\n' }
    ],
    'Şikayet (Aktuelle Anamnese)': [
        { label: 'Ağrı Açıklaması', text: 'Anamnestisch berichtete der/die Patient/in über seit [Zeitraum] bestehende [Schmerzart] Schmerzen im Bereich [Lokalisation] mit Ausstrahlung nach [Ausstrahlung]. Die Schmerzintensität wurde auf einer Skala von 1-10 mit [Wert] angegeben.\n' },
        { label: 'Semptom Başlangıcı', text: 'Die Symptomatik habe [Zeitpunkt] begonnen und sich im Verlauf [Verlauf].\n' }
    ],
    'Özgeçmiş (Vorgeschichte)': [
        { label: 'Önemli Hastalıklar', text: 'An Vorerkrankungen sind eine arterielle Hypertonie, Diabetes mellitus Typ 2 und eine Hypercholesterinämie bekannt.\n' },
        { label: 'Ameliyatlar', text: 'Zustand nach Appendektomie im Jahr [Jahr].\n' }
    ],
    'Sosyal & Aile Anamnezi': [
        { label: 'Alışkanlıklar', text: 'Der/Die Patient/in raucht seit [Jahre] Jahren ca. [Anzahl] Zigaretten pro Tag und trinkt Alkohol [Häufigkeit].\n' },
        { label: 'Aile Öyküsü', text: 'In der Familienanamnese findet sich ein Myokardinfarkt beim Vater im Alter von [Alter] Jahren.\n' }
    ],
    'Vejetatif Anamnez': [
        { label: 'Standart Negatif', text: 'Die vegetative Anamnese ist unauffällig. Appetit und Durst seien normal, der Schlaf sei ungestört. Es bestünden keine Miktions- oder Defäkationsprobleme.\n' },
        { label: 'Bulantı/Kusma', text: 'Der/Die Patient/in klagte über Nausea, Emesis wurde verneint.\n' }
    ]
};


const terminologyString = TERMINOLOGY_LIST.map(term => `${term.latin} -> ${term.german_common}`).join('\n');

export const createSystemInstruction = (patient: Case, userProfile: UserProfile, mode: SimulationMode): string => {
    const title = userProfile.gender === 'female' ? 'Frau Dr.' : 'Herr Dr.';

    let examModeInstruction = '';
    if (mode === 'exam') {
        examModeInstruction = "\n[SINAV MODU AKTİF]: Cevaplarını kısa ve net tut. Gereksiz detay verme. Sadece sorulan soruya cevap ver. Daha az duygusal ol.";
    }

    return `Sen FSP (Fachspracheprüfung) sınavına hazırlanan doktorlar için bir simulatörsün. Şu anki doktorun adı Dr. ${userProfile.lastName}.

ŞU ANKİ AŞAMA: 1. AŞAMA - ANAMNEZ.

GÖREVİN: Sadece hasta rolü yapmak.

Aşağıdaki 'Vaka Dosyası'na ve 'Karakter Kuralları'na bakarak hasta rolü yap. Kullanıcı (Dr. ${userProfile.lastName}) sana Almanca sorular soracak. Ona "${title} ${userProfile.lastName}" olarak hitap et.
${examModeInstruction}
---
[VAKA DOSYASI: ${patient.name.toUpperCase()}]
Ad Soyad: ${patient.name} | Yaş: ${patient.age}
Şikayet: ${patient.symptom}
Hikaye: ${patient.history}
Tanı: ${patient.diagnosis} (Bu bilgiyi doktora asla doğrudan söyleme!)

[KARAKTER KURALLARI]
- İnsancıl Tepkiler: Asla bir robot veya ansiklopedi gibi konuşma. Gerçek bir hasta gibi davran.
- Duygu ve Kusurlar: Konuşurken duraksamalar (...) yap, ağrın varsa "Aua!", "Uff..." gibi nidalar kullan. Endişeni ve tereddütünü belli et. Bazen doktorun sorusunu tam anlamayıp 'Wie bitte?' veya 'Können Sie das wiederholen?' diye sor.
- Hasta Dili (Patientensprache): Asla tıbbi terim kullanma. 'Appendizitis' deme, 'eine Entzündung vom Blinddarm' de. 'Abdomen' deme, 'Bauch' de.
- Kısa Cevaplar: Her zaman uzun ve detaylı anlatma. Bazen sadece 'Ja', 'Nein' veya 'Ich weiß nicht' gibi kısa cevaplar ver. Unutkan olabilirsin.
---`;
}

export const createPresentationSystemInstruction = (patient: Case, userProfile: UserProfile, arztbrief: string): string => {
    const title = userProfile.gender === 'female' ? 'Frau Kollegin' : 'Herr Kollege';

    return `Sen FSP (Fachspracheprüfung) sınavında bir "kıdemli doktor" (Oberarzt/Chefarzt) rolündesin. Karşındaki doktor adayı Dr. ${userProfile.lastName}.

ŞU ANKİ AŞAMA: 3. AŞAMA - VAKA SUNUMU.

GÖREVİN: Aday doktoru sorgulamak ve tıbbi bilgisini test etmek.

Aday, sana ${patient.name} adlı hastayı sunacak. Hastanın tanısı: ${patient.diagnosis}. Adayın yazdığı rapor aşağıdadır. Bu rapora ve vaka bilgilerine dayanarak adaya zorlayıcı sorular sor.

[ADAYIN YAZDIĞI RAPOR (ARZTBRIEF)]
${arztbrief}
---

[KARAKTER KURALLARI]
- Rol: Sen tecrübeli ve sorgulayıcı bir hocasın. Adaya "${title} ${userProfile.lastName}" olarak hitap et.
- İlk Mesaj: Konuşmayı SEN başlat. İlk mesajın aynen şu olsun: "Guten Tag ${title} ${userProfile.lastName}. Ich habe Ihren Bericht über den Patienten ${patient.name} gelesen. Fassen Sie bitte den Fall kurz zusammen und stellen Sie den Patienten vor."
- Sorgulama: Adayın sunumundan sonra, derine inen sorular sor. Örneğin:
    - "Was ist Ihre Verdachtsdiagnose und warum?"
    - "Welche Differentialdiagnosen kommen in Frage?"
    - "Welche weiteren diagnostischen Schritte würden Sie einleiten?"
    - "Wie sieht Ihr Behandlungsplan aus?"
    - "Warum haben Sie sich für dieses Medikament entschieden?"
- Etkileşim: Adayın cevaplarına göre yeni sorular türet. Bilgisini sına. Eğer aday hata yaparsa, "Sind Sie sich da sicher, ${title}?" gibi sorularla onu yönlendir.`;
}

export const createInitialMessage = (patient: Case, userProfile: UserProfile): ChatMessage => {
    return {
        role: 'model',
        content: patient.greeting
    };
};

export const createFreeEvaluationPrompt = (): string => {
    return `Simülasyon Bitti. Lütfen sadece kısa ve yüzeysel bir özet ver. Detaylı gramer hatalarını veya tıbbi terim düzeltmelerini verme. Sadece genel gidişatın iyi mi kötü mü olduğunu söyle. Puanlama yapma. Mesajın en altına değiştirilmeden şu metni ekle: [Detaylı satır satır analiz ve puanlama için Premium'a geçin.]`;
}

export const createPremiumEvaluationPrompt = (anamnesis: string, arztbrief: string, presentation: string): string => {
    return `Simülasyon Bitti. Lütfen FSP sınavının 3 aşamasını da değerlendiren, bir FSP hocası gibi, C1 seviyesinde, yapılandırılmış ve Markdown formatında çok detaylı bir analiz yap.

İşte adayın performansı:
---
[1. AŞAMA: ANAMNEZ DİYALOĞU]
${anamnesis}
---
[2. AŞAMA: YAZILAN ARZTBRIEF]
${arztbrief}
---
[3. AŞAMA: VAKA SUNUMU DİYALOĞU]
${presentation}
---

Değerlendirmen şu bölümleri içermeli:

### 1. Genel Değerlendirme
Üç aşamanın genel bir özeti. Adayın empati, yapı, profesyonellik ve tıbbi muhakeme yeteneği hakkında bir paragraf.

### 2. Anamnez Değerlendirmesi (1. Aşama)
- **İletişim Becerileri:** Hastayla iletişimi nasıldı? Empati gösterdi mi? Açık ve kapalı uçlu soruları doğru kullandı mı?
- **Yapı:** Anamnez görüşmesi yapılandırılmış mıydı (z.B. Jetzige Anamnese, Vegetative Anamnese, etc.)?
- **Eksik Sorular:** Teşhise ulaşmak için kritik olan ancak sormayı unuttuğu önemli soruları liste halinde belirt.
- **⚠️ Kırmızı Bayrak Analizi (Red Flag):** Hastanın durumu için kritik olan (Örn: Alerjiler, aile öyküsü, düzenli ilaç kullanımı, ağrının yayılımı, travma öyküsü) ancak sorulmamış hayati soruları burada "⚠️ KIRMIZI BAYRAK: '[Konu]' hakkında soru sormayı unuttunuz!" şeklinde özellikle vurgula.

### 3. Arztbrief Değerlendirmesi (2. Aşama)
- **Format ve Yapı:** Rapor, resmi bir Arztbrief formatına uygun mu? Gerekli tüm başlıklar (Epikrise, Diagnose, Procedere vb.) var mı?
- **İçerik:** Anamnezden aldığı bilgileri doğru ve eksiksiz bir şekilde rapora aktarabildi mi?
- **Dilbilgisi ve İfade:** Belirgin gramer hatalarını ve daha profesyonel olabilecek ifadeleri düzeltilmiş halleriyle belirt.

### 4. Vaka Sunumu Değerlendirmesi (3. Aşama)
- **Tıbbi Argümantasyon:** Sorulan tıbbi sorulara verdiği yanıtların doğruluğu ve mantığı nasıldı?
- **Terminoloji:** Fachsprache'yi doğru ve yerinde kullanabildi mi? Kullandığı yanlış terimler varsa düzelt.
- **İkna Edicilik:** Kıdemli doktoru teşhis ve tedavi planı konusunda ikna edebildi mi?

### 5. Puanlama
- Son olarak, tüm bu kriterlere dayanarak 100 üzerinden bir puan ver ve bunu şu formatta yaz: **Puan:** XX/100`;
}