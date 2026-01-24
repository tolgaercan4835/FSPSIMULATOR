import React from 'react';

const LegalSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-sky-400 border-b-2 border-sky-800 pb-3 mb-6">{title}</h2>
        <div className="space-y-6 text-gray-300 prose prose-invert max-w-none prose-p:my-2 prose-h3:text-gray-100 prose-li:my-1">
            {children}
        </div>
    </section>
);

const LegalClause: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>
        {children}
    </div>
);

const TurkishExplanation: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-sm text-gray-400 mt-2 p-3 bg-gray-800/50 border-l-4 border-gray-600 rounded-r-md">
        <strong><em>Açıklama:</em></strong> <em>{children}</em>
    </p>
);

const LegalView: React.FC = () => {
    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full bg-gray-900 min-h-screen">
            <header className="text-center mb-16 pt-8">
                <h1 className="text-5xl font-extrabold text-gray-100 tracking-tight">Rechtliche Hinweise</h1>
                <p className="text-xl text-gray-400 mt-3">Yasal Bilgilendirme</p>
                <p className="text-sm text-gray-500 mt-2">Stand: 25. Juli 2024</p>
            </header>

            <LegalSection title="Nutzungsbedingungen">
                <LegalClause title="§ 1 Geltungsbereich und Anbieter">
                    <p>Diese Nutzungsbedingungen regeln die Nutzung der webbasierten Plattform "FSP Simülatörü" (nachfolgend "Dienst" genannt), angeboten durch [Ihr Name/Firmenname] (nachfolgend "Anbieter" genannt).</p>
                    <TurkishExplanation>
                        Bu koşullar, "FSP Simülatörü" platformunun kullanımını düzenler.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="§ 2 Vertragsgegenstand und Zweck">
                    <p>Der Dienst ist ein KI-gestütztes Simulations- und Vorbereitungswerkzeug für Ärzte, die sich auf die Fachsprachenprüfung (FSP) vorbereiten. Der Dienst simuliert Patientengespräche und Prüfungssituationen.</p>
                    <p><strong>Wichtiger Hinweis:</strong> Der Dienst ist ausschließlich als Lern- und Simulationswerkzeug konzipiert. Der Anbieter übernimmt keine Garantie für das Bestehen der FSP-Prüfung oder für die medizinische Korrektheit und Vollständigkeit der durch die KI generierten Inhalte. Der Dienst stellt keine medizinische Beratung dar und ersetzt keine professionelle Ausbildung.</p>
                    <TurkishExplanation>
                        Bu platform, FSP sınavına hazırlık için bir yapay zeka simülasyon aracıdır. Sınavı geçeceğinizin veya yapay zeka tarafından üretilen bilgilerin tıbbi olarak doğru olduğunun garantisi verilmez. Bu bir eğitim aracıdır.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="§ 3 Vertragsschluss, Abonnement und Laufzeit">
                    <p>Der Vertragsschluss erfolgt durch den Kauf eines Abonnements über unseren Zahlungsdienstleister Lemon Squeezy. Das Abonnement hat eine feste Laufzeit von drei (3) Monaten zum Preis von 499 TL. Nach Ablauf der drei Monate endet der Zugang zum Dienst automatisch. Es erfolgt keine automatische Verlängerung.</p>
                    <TurkishExplanation>
                        Hizmeti kullanmak için Lemon Squeezy üzerinden 3 aylık abonelik (499 TL) satın alırsınız. Süre sonunda erişiminiz otomatik olarak biter ve abonelik yenilenmez.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="§ 4 Widerrufsrecht und Rückerstattung">
                    <p>Da es sich um eine digitale Dienstleistung handelt, die sofort nach dem Kauf vollständig genutzt werden kann, stimmt der Nutzer ausdrücklich zu, dass der Anbieter mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnt. Der Nutzer nimmt zur Kenntnis, dass er hierdurch sein Widerrufsrecht verliert. Eine Rückerstattung der Gebühren ist ausgeschlossen.</p>
                    <TurkishExplanation>
                        Satın aldığınız hizmet dijital bir ürün olup anında kullanıma açıldığı için yasal cayma hakkınızdan feragat ettiğinizi kabul edersiniz. Bu nedenle ücret iadesi yapılmamaktadır.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="§ 5 Beendigung des Dienstes durch den Anbieter">
                    <p>Der Anbieter behält sich das Recht vor, den Betrieb des Dienstes aus technischen oder wirtschaftlichen Gründen einzustellen. In einem solchen Fall wird der Anbieter die Nutzer mindestens 30 Tage im Voraus per E-Mail über die bevorstehende Einstellung informieren.</p>
                    <TurkishExplanation>
                        Yazılım sağlayıcı, teknik veya ticari nedenlerle hizmeti sonlandırma kararı alabilir. Böyle bir durumda, kullanıcılara en az 30 gün önceden e-posta ile bildirim yapılacaktır.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="§ 6 Haftungsbeschränkung">
                    <p>Die Haftung des Anbieters für Schäden, die durch die Nutzung des Dienstes entstehen, ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Dies gilt nicht für die Verletzung von Leben, Körper oder Gesundheit.</p>
                    <TurkishExplanation>
                        Hizmetin kullanımından doğabilecek zararlarda sorumluluğumuz, yalnızca kasıtlı veya ağır ihmal durumlarıyla sınırlıdır.
                    </TurkishExplanation>
                </LegalClause>
            </LegalSection>
            
            <LegalSection title="Datenschutzerklärung">
                <LegalClause title="1. Erhebung und Verarbeitung von Daten">
                    <p>Wir verarbeiten personenbezogene Daten, die Sie uns bei der Registrierung (Name, E-Mail-Adresse) und Nutzung unseres Dienstes zur Verfügung stellen.</p>
                    <TurkishExplanation>
                        Kayıt ve kullanım sırasında sağladığınız kişisel verileri (isim, e-posta vb.) işliyoruz.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="2. Datenweitergabe an Dritte">
                    <p>Zur Bereitstellung unseres Dienstes arbeiten wir mit spezialisierten Drittanbietern zusammen. Eine Datenweitergabe erfolgt ausschließlich auf Grundlage der gesetzlichen Bestimmungen und dieser Erklärung.</p>
                    <ul>
                        <li><strong>Lemon Squeezy:</strong> Für die Abwicklung von Zahlungen nutzen wir den Dienst von Lemon Squeezy. Wir speichern keine Kreditkartendaten. Es gelten die Datenschutzbestimmungen von Lemon Squeezy.</li>
                        <li><strong>Supabase:</strong> Für die Speicherung von Nutzerprofilen, Abonnementsstatus und dem Simulationsverlauf nutzen wir die Datenbankdienste von Supabase. Die Server befinden sich in der EU.</li>
                        <li><strong>Google Cloud Platform (Gemini API & Text-to-Speech API):</strong> Um die KI-gestützte Simulation zu ermöglichen, werden Ihre Eingaben (Text- und Sprachdaten während der Simulation) anonymisiert an die Server von Google übermittelt. Diese Daten werden ausschließlich zur Generierung der Antworten des KI-Patienten und -Prüfers sowie zur Sprachausgabe verwendet und nicht zur Verbesserung der Google-Modelle genutzt.</li>
                    </ul>
                     <TurkishExplanation>
                        Hizmeti sunabilmek için verilerinizi üçüncü parti servislerle paylaşıyoruz: Ödemeler için Lemon Squeezy, kullanıcı veritabanı için Supabase ve yapay zeka simülasyonu için Google Cloud. Simülasyon sırasında girdiğiniz veriler (yazı/ses), cevap üretilmesi amacıyla anonim olarak Google sunucularına gönderilir.
                    </TurkishExplanation>
                </LegalClause>

                <LegalClause title="3. Ihre Rechte">
                    <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten gemäß der DSGVO.</p>
                    <TurkishExplanation>
                        Kişisel verilerinizle ilgili olarak bilgi alma, düzeltme, silme gibi yasal haklara sahipsiniz.
                    </TurkishExplanation>
                </LegalClause>
            </LegalSection>
        </div>
    );
};

export default LegalView;