
/*!
  * Sa11y, the accessibility quality assurance assistant.
  * @version 3.1.3
  * @author Adam Chaboryk
  * @license GPL-2.0-or-later
  * @copyright © 2020 - 2024 Toronto Metropolitan University.
  * @contact adam.chaboryk@torontomu.ca
  * GitHub: git+https://github.com/ryersondmp/sa11y.git | Website: https://sa11y.netlify.app
  * For all acknowledgements, please visit: https://sa11y.netlify.app/acknowledgements/
  * The above copyright notice shall be included in all copies or substantial portions of the Software.
**/
/*! WARNING: This is a machine-generated translation and may contain errors or inaccuracies. */
var nb = {
  // Norwegian (Bokmal)
  strings: {
    LANG_CODE: 'nb',
    MAIN_TOGGLE_LABEL: 'Sjekk tilgjengelighet',
    CONTAINER_LABEL: 'Tilgjengelighetssjekk',
    ERROR: 'Feil',
    ERRORS: 'Feil',
    WARNING: 'Advarsel',
    WARNINGS: 'Advarsler',
    GOOD: 'Bra',
    ON: 'På',
    OFF: 'Av',
    ALERT_TEXT: 'Varsling',
    ALERT_CLOSE: 'Lukk',
    OUTLINE: 'Sideoversikt',
    PAGE_ISSUES: 'Side Problemer',
    SETTINGS: 'Innstillinger',
    CONTRAST: 'Kontrast',
    FORM_LABELS: 'Skjemaetiketter',
    LINKS_ADVANCED: 'Lenker (avansert)',
    DARK_MODE: 'Mørk modus',
    SHORTCUT_SCREEN_READER: 'Gå til utgaven. Snarvei til tastaturet: Alt S',
    SHORTCUT_TOOLTIP: 'Gå til utgaven',
    NEW_TAB: 'Åpner ny fane',
    PANEL_HEADING: 'Tilgjengelighetskontroll',
    PANEL_STATUS_NONE: 'Ingen feil funnet.',
    PANEL_ICON_WARNINGS: 'advarsler funnet.',
    PANEL_ICON_TOTAL: 'totalt antall problemer funnet.',
    NOT_VISIBLE_ALERT: 'Elementet du prøver å se, er ikke synlig; det kan være skjult eller inne i en trekkspill- eller fanekomponent. Her er en forhåndsvisning:',
    ERROR_MISSING_ROOT_TARGET: 'Hele siden ble kontrollert for tilgjengelighet fordi målområdet <code>%(root)</code> ikke finnes.',
    HEADING_NOT_VISIBLE_ALERT: 'Overskriften er ikke synlig; den kan være skjult eller inne i en trekkspill- eller fanekomponent.',
    SKIP_TO_PAGE_ISSUES: 'Gå til sideproblemer',
    CONSOLE_ERROR_MESSAGE: 'Beklager, men det er et problem med tilgjengelighetskontrollen på denne siden. Kan du <a href="%(link)">rapportere det via dette skjemaet</a> eller på <a href="%(link)">GitHub</a>?',

    // Dismiss
    PANEL_DISMISS_BUTTON: 'Vis %(dismissCount) avviste advarsler',
    DISMISS: 'Avvis',
    DISMISSED: 'Avviste advarsler',
    DISMISS_REMINDER: 'Vær oppmerksom på at advarsler bare avvises <strong>midlertidig</strong>. Hvis du sletter nettleserens historikk og informasjonskapsler, gjenopprettes alle tidligere avviste advarsler på alle sider.',

    // Export
    DATE: 'Dato',
    PAGE_TITLE: 'Sidetittel',
    RESULTS: 'Resultater',
    EXPORT_RESULTS: 'Eksporter resultater',
    GENERATED: 'Resultater generert med %(tool).',
    PREVIEW: 'Forhåndsvisning',
    ELEMENT: 'Element',
    PATH: 'Sti',

    // Colour filters
    COLOUR_FILTER: 'Fargefilter',
    PROTANOPIA: 'Protanopi',
    DEUTERANOPIA: 'Deuteranopi',
    TRITANOPIA: 'Tritanopia',
    MONOCHROMACY: 'Monokromi',
    COLOUR_FILTER_MESSAGE: 'Se etter elementer som er vanskelige å oppfatte eller skille fra andre farger.',
    RED_EYE: 'Rød blind.',
    GREEN_EYE: 'Grønn persienne.',
    BLUE_EYE: 'Blå persienne.',
    MONO_EYE: 'Rød, blå og grønn blind.',
    COLOUR_FILTER_HIGH_CONTRAST_MESSAGE: 'Fargefiltre fungerer ikke i modus for høy kontrast.',

    // Alternative text stopwords
    SUSPICIOUS_ALT_STOPWORDS: [
      'bilde',
      'grafisk',
      'bilde',
      'foto',
      'photo',
      'image',
      'graphic',
    ],
    PLACEHOLDER_ALT_STOPWORDS: [
      'alt',
      'bilde',
      'foto',
      'dekorativ',
      'photo',
      'image',
      'graphic',
      'plassholder',
      'plassholderbilde',
      'avstandsstykke',
    ],
    PARTIAL_ALT_STOPWORDS: [
      'klikk på',
      'klikk her',
      'klikk her for mer informasjon',
      'ved å klikke her',
      'sjekk ut',
      'beskrevet her',
      'nedlasting',
      'last ned her',
      'finne ut',
      'finn ut mer',
      'skjema',
      'her',
      'info',
      'informasjon',
      'lenke',
      'lære',
      'lære mer',
      'få vite mer',
      'les mer',
      'lære å',
      'mer',
      'side',
      'papir',
      'lese',
      'les dette',
      'dette',
      'denne siden',
      'dette nettstedet',
      'visning',
      'se vår',
      'nettsted',
    ],
    WARNING_ALT_STOPWORDS: [
      'klikk her',
    ],
    NEW_WINDOW_PHRASES: [
      'ekstern',
      'ny fane',
      'nytt vindu',
      'pop-up',
      'dukker opp',
    ],
    FILE_TYPE_PHRASES: ['dokument', 'regneark', 'kalkulasjonsark', 'komprimert fil', 'arkivert fil', 'regneark', 'powerpoint', 'presentasjon', 'installasjon', 'video', 'lyd', 'pdf'],
    LANG_READABILITY: 'Lesbarhet',
    LANG_AVG_SENTENCE: 'Gjennomsnittlig antall ord per setning:',
    LANG_COMPLEX_WORDS: 'Komplekse ord:',
    LANG_TOTAL_WORDS: 'Ord:',
    LANG_VERY_DIFFICULT: 'Svært vanskelig',
    LANG_DIFFICULT: 'Vanskelig',
    LANG_FAIRLY_DIFFICULT: 'Ganske vanskelig',
    LANG_GOOD: 'Bra',
    READABILITY_NO_P_OR_LI_MESSAGE: 'Kunne ikke beregne lesbarhetspoeng. Ingen avsnitt <code>&lt;p&gt;</code> eller listeinnhold <code>&lt;li&gt;</code> funnet.',
    READABILITY_NOT_ENOUGH_CONTENT_MESSAGE: 'Ikke nok innhold til å beregne lesbarhetspoeng.',
    HEADING_NON_CONSECUTIVE_LEVEL: 'Det brukes ikke fortløpende overskriftsnivåer. Overskrifter skal aldri hoppe over nivåer, eller gå fra <strong>Overskrift %(prevLevel)</strong> til <strong {r}>Overskrift %(level)</strong>.',
    HEADING_EMPTY: 'Tom overskrift funnet! Løsningen er å slette denne linjen eller endre formatet fra <strong {r}>Overskrift %(level)</strong> til <strong>Normal</strong> eller <strong>Avsnitt</strong>.',
    HEADING_LONG: 'Overskriften er lang! Overskrifter skal brukes til å organisere innholdet og formidle struktur. De bør være korte, informative og unike. Hold overskriftene på mindre enn 160 tegn (ikke mer enn en setning). <hr> Antall tegn: <strong {r}>%(headingLength)</strong>',
    HEADING_FIRST: 'Den første overskriften på en side bør vanligvis være en Overskrift 1 eller Overskrift 2. Overskrift 1 bør være starten på hoveddelen av innholdet, og er hovedoverskriften som beskriver det overordnede formålet med siden. Les mer om <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Overskriftsstruktur</a>.',
    HEADING_MISSING_ONE: 'Manglende overskrift 1. Overskrift 1 skal være starten på hovedinnholdsområdet, og er hovedoverskriften som beskriver det overordnede formålet med siden. Les mer om <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/">Overskriftsstruktur.</a>.',
    HEADING_EMPTY_WITH_IMAGE: 'Overskrift har ingen tekst, men inneholder et bilde. Hvis dette ikke er en overskrift, endrer du formatet fra <strong {r}>Overskrift %(level)</strong> til <strong>Normal</strong> eller <strong>Avsnitt</strong>. Ellers kan du legge til alt-tekst til bildet hvis det ikke er dekorativt.',
    PANEL_HEADING_MISSING_ONE: 'Manglende overskrift 1!',
    PANEL_NO_HEADINGS: 'Ingen overskrifter funnet.',
    LINK_EMPTY: 'Fjern tomme lenker uten tekst.',
    LINK_EMPTY_LINK_NO_LABEL: 'Lenken har ikke tydelig tekst som er synlig for skjermlesere og andre hjelpemidler. Slik løser du problemet: <ul><li>Legg til en kortfattet tekst som beskriver hvor lenken fører deg.</li><li>Hvis det er en <a href="https://a11y-101.com/development/icons-and-links">ikonlenke eller SVG,</a> mangler den sannsynligvis en beskrivende etikett.</li><li>Hvis du tror at denne lenken er en feil på grunn av en copy/paste-feil, bør du vurdere å slette den.</li></ul>.',
    LINK_LABEL: '<strong>Lenketikett:</strong> %(sanitizedText)',
    LINK_STOPWORD: 'Lenketeksten er kanskje ikke beskrivende nok uten sammenheng: <strong {r}>%(error)</strong><hr><strong>Tips!</strong> Lenketekst bør alltid være tydelig, unik og meningsfull. Unngå vanlige ord som "klikk her" eller "les mer"',
    LINK_BEST_PRACTICES: 'Vurder å erstatte lenketeksten: <strong {r}>%(error)</strong><hr><ul><li>&quot;Klikk her&quot; setter fokus på musemekanikk, når mange ikke bruker mus eller kanskje ser dette nettstedet på en mobil enhet. Vurder å bruke et annet verb som er relatert til oppgaven.</li><li>Ungå å bruke HTML-symboler som call to actions med mindre de er skjult for hjelpemidler.</li></ul>.',
    LINK_URL: 'Lengre, mindre forståelige nettadresser som brukes som lenketekst, kan være vanskelige å lytte til med hjelpemidler. I de fleste tilfeller er det bedre å bruke tekst som kan leses av mennesker i stedet for URL-adressen. Korte nettadresser (for eksempel et nettsteds hjemmeside) er ok.<hr><strong>Tips!</strong> Lenketeksten bør alltid være tydelig, unik og meningsfull, slik at den kan forstås utenfor kontekst.',
    LINK_DOI: '<a href="https://apastyle.apa.org/style-grammar-guidelines/paper-format/accessibility/urls#:~:text=descriptive%20links">APA Style-guiden</a> anbefaler at du bruker beskrivende lenker til nettsider eller rene nettressurser ved å legge URL-adressen eller DOI-en til verket rundt tittelen. Lengre, mindre forståelige URL-er som brukes som lenketekst, kan være vanskelige å forstå når de brukes med hjelpemidler.',
    NEW_TAB_WARNING: 'Lenken åpnes i en ny fane eller et nytt vindu uten forvarsel. Det kan virke forvirrende, særlig for personer som har problemer med å oppfatte visuelt innhold. For det andre er det ikke alltid en god praksis å kontrollere andres opplevelse eller ta avgjørelser for dem. Angi at lenken åpnes i et nytt vindu i lenketeksten<hr><strong>Tips!</strong> Lær beste praksis: <a href="https://www.nngroup.com/articles/new-browser-windows-and-tabs/">åpning av lenker i nye nettleservinduer og faner.</a>',
    FILE_TYPE_WARNING: 'Lenken peker til en PDF-fil eller en nedlastbar fil (f.eks. MP3, Zip, Word-dokument) uten advarsel. Oppgi filtypen i lenketeksten. Hvis det er en stor fil, bør du vurdere å inkludere filstørrelsen.<hr><strong>Eksempel:</strong> Executive Report (PDF, 3 MB)',
    LINK_IDENTICAL_NAME: 'Lenken har samme tekst som en annen lenke, selv om den peker til en annen side. Flere lenker med samme tekst kan skape forvirring for personer som bruker skjermlesere.<hr>Vurder å gjøre følgende lenke mer beskrivende for å skille den fra andre lenker: <strong {r}>%(sanitizedText)</strong>',
    MISSING_ALT_LINK_BUT_HAS_TEXT_MESSAGE: 'Bildet brukes som lenke med omkringliggende tekst, selv om alt-attributtet skal være merket som dekorativt eller null.',
    MISSING_ALT_LINK_MESSAGE: 'Bildet brukes som lenke, men mangler alt-tekst! Sørg for at alt-teksten beskriver hvor lenken fører deg.',
    MISSING_ALT_MESSAGE: 'Manglende alt-tekst! Hvis bildet formidler en historie, en stemning eller viktig informasjon - sørg for å beskrive bildet.',
    LINK_ALT_HAS_FILE_EXTENSION: 'Filendelsen i alt-teksten ble funnet. Sørg for at alt-teksten beskriver målet for lenken, ikke en bokstavelig beskrivelse av bildet. Fjern dette: <strong {r}>%(error)</strong>.<hr><strong>Alt-tekst:</strong> %(altText)',
    LINK_IMAGE_PLACEHOLDER_ALT_MESSAGE: 'Alt-tekst uten beskrivelse eller plassholder i et lenket bilde funnet. Sørg for at alt-teksten beskriver målet for lenken, ikke en bokstavelig beskrivelse av bildet. Erstatt følgende alt-tekst: <strong {r}>%(altText)</strong>',
    LINK_IMAGE_SUS_ALT_MESSAGE: 'Hjelpemidler indikerer allerede at dette er et bilde, så &quot;<strong {r}>%(error)</strong>&quot; kan være overflødig. Sørg for at alt-teksten beskriver målet for lenken, ikke en bokstavelig beskrivelse av bildet. <hr> <strong>Alt-tekst:</strong> %(altText)',
    ALT_HAS_FILE_EXTENSION: 'Filtypen i alt-teksten som er funnet. Hvis bildet formidler en historie, en stemning eller viktig informasjon - husk å beskrive bildet. Fjern dette: <strong {r}>%(error)</strong>.<hr><strong>Alt-tekst:</strong> %(altText)',
    ALT_PLACEHOLDER_MESSAGE: 'Ikke-beskrivende alt-tekst eller plassholder-alt-tekst funnet. Erstatt følgende alt-tekst med noe mer meningsfylt: <strong {r}>%(altText)</strong>',
    ALT_HAS_SUS_WORD: 'Hjelpemidler indikerer allerede at dette er et bilde, så &quot;<strong {r}>%(error)</strong>&quot; kan være overflødig. <hr> <strong>Alt-tekst:</strong> %(altText)',
    LINK_HIDDEN_FOCUSABLE: 'Lenken har <code>aria-hidden=&quot;true&quot;</code>, men er fortsatt tastaturfokuserbar. Hvis du har til hensikt å skjule en overflødig eller duplisert lenke, legg til <code>tabindex=&quot;-1&quot;</code> også.',
    LINK_IMAGE_NO_ALT_TEXT: 'Bildet i lenken er merket som dekorativt, og det er ingen lenketekst. Legg til alt-tekst i bildet som beskriver lenkens destinasjon.',
    LINK_IMAGE_HAS_TEXT: 'Bildet er merket som dekorativt, selv om lenken bruker den omkringliggende teksten som en beskrivende etikett.',
    LINK_IMAGE_LONG_ALT: 'Alt-tekstbeskrivelsen på et lenket bilde er <strong>for lang</strong>. Alt-teksten på lenkede bilder bør beskrive hvor lenken tar deg, ikke en bokstavelig beskrivelse av bildet. <strong>Vurder å bruke tittelen på siden det lenkes til som alt-tekst.</strong> <hr> <strong>Alt-tekst (<span {r}>%(altLength)</span> tegn):</strong> %(altText)',
    LINK_IMAGE_ALT_WARNING: 'Bildelenken inneholder alt-tekst. <strong>Beskriver alt-teksten hvor lenken fører deg?</strong> Vurder å bruke tittelen på siden det lenkes til som alt-tekst. <hr> <strong>Alt-tekst:</strong> %(altText)',
    LINK_IMAGE_ALT_AND_TEXT_WARNING: 'Bildelenken inneholder <strong>både alt-tekst og omkringliggende lenketekst.</strong> Hvis dette bildet er dekorativt og brukes som en funksjonell lenke til en annen side, bør du vurdere å merke bildet som dekorativt eller null - den omkringliggende lenketeksten bør være tilstrekkelig. <hr> <strong>Alt-tekst:</strong> %(altText) <hr> <strong>Lenketikett:</strong> %(sanitizedText)',
    IMAGE_FIGURE_DECORATIVE: 'Bildet er merket som <strong>dekorativt</strong> og vil bli ignorert av hjelpemidler. <hr> Selv om det er oppgitt en <strong>caption</strong>, bør bildet også ha en alt-tekst i de fleste tilfeller. <ul><li>Alternativteksten bør gi en kortfattet beskrivelse av hva som er i bildet.</li><li>Bildeteksten bør vanligvis gi kontekst for å relatere bildet til det omkringliggende innholdet, eller gi oppmerksomhet til en bestemt del av informasjonen.</li></ul>Lær mer: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a>',
    IMAGE_FIGURE_DUPLICATE_ALT: 'Ikke bruk nøyaktig de samme ordene i alt- og bildeteksten. Skjermlesere vil annonsere informasjonen to ganger.<ul><li>Alt-teksten bør gi en kortfattet beskrivelse av hva som er i bildet.</li><li>Bildeteksten bør vanligvis gi kontekst for å relatere bildet til det omkringliggende innholdet, eller gi oppmerksomhet til en bestemt del av informasjonen.</li></ul> Les mer: <a href="https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element">alt versus figcaption.</a> <hr> <strong>Alt-tekst:</strong> %(altText)',
    IMAGE_DECORATIVE: 'Bildet er merket som <strong>dekorativt</strong> og vil bli ignorert av hjelpemidler. Hvis bildet formidler en historie, en stemning eller viktig informasjon - husk å legge til alt-tekst.',
    IMAGE_ALT_TOO_LONG: 'Alt-tekstbeskrivelsen er <strong>for lang</strong>. Alt-teksten bør være kortfattet, men likevel meningsfull, som en <em>tweet</em> (rundt 100 tegn). Hvis dette er et komplekst bilde eller en graf, bør du vurdere å legge den lange beskrivelsen av bildet i teksten nedenfor eller i en trekkspillkomponent. <hr> <strong>Alttekst (<span {r}>%(altLength)</span> tegn):</strong> %(altText)',
    IMAGE_PASS: '<strong>Alt-tekst:</strong> %(altText)',
    LABELS_MISSING_IMAGE_INPUT_MESSAGE: 'Bildeknappen mangler alt-tekst. Legg til alt-tekst for å gi et tilgjengelig navn. For eksempel: <em>Søk</em> eller <em>Send</em>.',
    LABELS_INPUT_RESET_MESSAGE: 'Tilbakestillingsknapper bør <strong>ikke</strong> brukes med mindre det er spesifikt behov for dem, fordi de lett kan aktiveres ved en feiltakelse. <hr> <strong>Tips!</strong> Les mer om hvorfor <a href="https://www.nngroup.com/articles/reset-and-cancel-buttons/">Reset- og Cancel-knapper er problematiske for brukervennligheten.',
    LABELS_ARIA_LABEL_INPUT_MESSAGE: 'Inndataene har et tilgjengelig navn, men sørg for at de også har en synlig etikett. <hr> <strong>Inndatalabel:</strong> %(sanitizedText)',
    LABELS_NO_FOR_ATTRIBUTE_MESSAGE: 'Det er ingen etikett knyttet til denne inndataen. Legg til et <code>for</code>-attributt i etiketten som samsvarer med <code>id</code> for denne inndataen. <hr> ID-en for denne inndataen er: <strong>id=&#34;%(id)&#34;</strong>',
    LABELS_MISSING_LABEL_MESSAGE: 'Det er ingen etikett knyttet til denne inndataen. Legg til et <code>id</code> til denne inndataen, og legg til et matchende <code>for</code>-attributt til etiketten.',
    EMBED_VIDEO: 'Sørg for at <strong>alle videoer er tekstet.</strong> Det er et obligatorisk nivå A-krav at alt lyd- og videoinnhold er tekstet. Teksting er til hjelp for personer som er døve eller har nedsatt hørsel.',
    EMBED_AUDIO: 'Sørg for å levere en <strong>utskrift for alle podcaster.</strong> Det er et obligatorisk nivå A-krav å levere utskrifter for lydinnhold. Transkripsjoner er til hjelp for døve og hørselshemmede, men kan være til nytte for alle. Vurder å plassere transkripsjonen nedenfor eller i et trekkspillpanel.',
    EMBED_DATA_VIZ: 'Datavisualiseringswidgets som dette er ofte problematiske for personer som bruker tastatur eller skjermleser for å navigere, og kan by på betydelige problemer for personer med nedsatt syn eller fargeblindhet. Det anbefales å gi den samme informasjonen i et alternativt format (tekst eller tabell) under widgeten. <hr> Les mer om <a href="https://www.w3.org/WAI/tutorials/images/complex">komplekse bilder</a>.',
    EMBED_MISSING_TITLE: 'Innebygd innhold krever et tilgjengelig navn som beskriver innholdet. Oppgi et unikt <code>title</code> eller <code>aria-label</code>-attributt på <code>iframe</code>-elementet. Finn ut mer om <a href="https://web.dev/learn/accessibility/more-html#iframes">iFrames.</a>.',
    EMBED_GENERAL_WARNING: 'Kunne ikke sjekke innebygd innhold. Kontroller at bilder har alt-tekst, videoer har bildetekster, tekst har tilstrekkelig kontrast og interaktive komponenter er <a href="https://webaim.org/techniques/keyboard/">tilgjengelige via tastaturet.</a>.',
    EMBED_UNFOCUSABLE: '<code>&lt;iframe&gt;</code> med ikke-fokuserbare elementer bør ikke ha <code>tabindex="-1"</code>. Den innebygde innholdet vil ikke være tilgjengelig med tastaturet.',
    QA_BAD_LINK: 'Feil lenke funnet. Lenken ser ut til å peke til et utviklingsmiljø. <hr> Denne lenken peker til: <br> <strong {r}>%(el)</strong>',
    QA_BAD_ITALICS: 'Fet og kursiv har en semantisk betydning, og bør <strong>ikke</strong> brukes til å fremheve hele avsnitt. Fet skrift skal brukes til å fremheve et ord eller en frase. Kursiv skal brukes til å fremheve egennavn (f.eks. bok- og artikkeltitler), fremmedord og sitater. Lange sitater bør formateres som blokksitater.',
    QA_PDF: 'Kan ikke sjekke om PDF-filer er tilgjengelige. PDF-filer regnes som nettinnhold og må også gjøres tilgjengelige. PDF-filer inneholder ofte problemer for personer som bruker skjermlesere (manglende strukturelle tagger eller manglende etiketter for skjemafelt) og personer med nedsatt syn (teksten flyter ikke ut igjen når den forstørres). <ul><li>Hvis dette er et skjema, bør du vurdere å bruke et tilgjengelig HTML-skjema som et alternativ.</li><li>Hvis dette er et dokument, bør du vurdere å konvertere det til en nettside.</li></ul> Ellers kan du sjekke om <a href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html">PDF-en er tilgjengelig i Acrobat DC.</a>.',
    QA_DOCUMENT: 'Kan ikke sjekke dokumentets tilgjengelighet. Lenkede dokumenter regnes som nettinnhold og må også gjøres tilgjengelige. Vennligst gå gjennom dette dokumentet manuelt. <ul><li>Gjør <a href="https://support.google.com/docs/answer/6199477?hl=nb">Google Workspace-dokumentet eller -presentasjonen mer tilgjengelig.</a></li><li>Gjør <a href="https://support.microsoft.com/nb/office/create-accessible-office-documents-868ecfcd-4f00-4224-b881-a65537a7c155">Office-dokumenter mer tilgjengelige.</a></li></ul>',
    QA_PAGE_LANGUAGE: 'Sidens språk er ikke oppgitt! Vennligst <a href="https://www.w3.org/International/questions/qa-html-language-declarations">deklarer språk i HTML-taggen.</a>.',
    QA_PAGE_TITLE: 'Manglende sidetittel! Vennligst oppgi en <a href="https://developer.mozilla.org/nb/docs/Web/HTML/Element/title">sidetittel.</a>.',
    QA_BLOCKQUOTE_MESSAGE: 'Er dette en overskrift? <strong {r}>%(sanitizedText)</strong> <hr> Blokksitater skal kun brukes til sitater. Hvis dette er ment å være en overskrift, endrer du blokksitatet til en semantisk overskrift (f.eks. Overskrift 2 eller Overskrift 3).',
    QA_FAKE_HEADING: 'Er dette en overskrift? <strong {r}>%(boldtext)</strong> <hr> En linje med fet eller stor tekst kan se ut som en overskrift, men en person som bruker skjermleser, kan ikke se at den er viktig eller hoppe til innholdet. Fet eller stor tekst bør aldri erstatte semantiske overskrifter (overskrift 2 til overskrift 6).',
    QA_SHOULD_BE_LIST: 'Prøver du å opprette en liste? Mulig listeelement funnet: <strong {r}>%(firstPrefix)</strong> <hr> Sørg for å bruke semantiske lister ved å bruke knappene for punkt- eller tallformatering i stedet. Når du bruker en semantisk liste, kan hjelpemidler formidle informasjon som det totale antallet elementer og den relative posisjonen til hvert element i listen. Finn ut mer om <a href="https://www.w3.org/WAI/tutorials/page-structure/content/#lists">semantiske lister.</a>.',
    QA_UPPERCASE_WARNING: 'Fant store bokstaver. Noen skjermlesere kan tolke tekst med store bokstaver som et akronym og vil lese hver bokstav for seg. I tillegg synes noen at store bokstaver er vanskeligere å lese, og det kan gi inntrykk av at man roper.',
    QA_DUPLICATE_ID: 'Fant <strong>duplisert ID</strong>. Feil med dupliserte ID-er er kjent for å forårsake problemer for hjelpeteknologier når de prøver å samhandle med innhold. <hr> Vennligst fjern eller endre følgende ID: <strong {r}>%(id)</strong>',
    QA_TEXT_UNDERLINE_WARNING: 'Understreket tekst kan forveksles med lenker. Vurder å bruke en annen stil, for eksempel <code>&lt;strong&gt;</code><strong>strong importance</strong><code>&lt;/strong&gt;</code> eller <code>&lt;em&gt;</code><em>emphasis</em><code>&lt;/em&gt;</code>.',
    QA_SUBSCRIPT_WARNING: 'Formateringsalternativene subscript og superscript skal bare brukes til å endre plasseringen av tekst i henhold til typografiske konvensjoner eller standarder. De bør <strong>ikke</strong> brukes utelukkende til presentasjons- eller utseendeformål. Formatering av hele setninger gir problemer med lesbarheten. Det kan for eksempel være aktuelt å vise eksponenter, ordenstall som 4<sup>th</sup> i stedet for fjerde, og kjemiske formler (f.eks. H<sub>2</sub>O).',
    TABLES_MISSING_HEADINGS: 'Manglende tabelloverskrifter! Universelt utformede tabeller trenger HTML-merking som angir overskriftsceller og dataceller, og som definerer forholdet mellom dem. Denne informasjonen gir kontekst til personer som bruker hjelpemidler. Tabeller bør kun brukes til tabelldata. <hr> Les mer om <a href="https://www.w3.org/WAI/tutorials/tables/">tilgjengelige tabeller.</a>',
    TABLES_SEMANTIC_HEADING: 'Semantiske overskrifter som overskrift 2 eller overskrift 3 skal bare brukes til innholdsseksjoner, <strong>ikke</strong> i HTML-tabeller. Angi tabelloverskrifter ved hjelp av <code>&lt;th&gt;</code>-elementet i stedet. <hr> Les mer om <a href="https://www.w3.org/WAI/tutorials/tables/">tilgjengelige tabeller</a>.',
    TABLES_EMPTY_HEADING: 'Tom tabelloverskrift funnet! Tabelloverskrifter skal <strong>aldri</strong> være tomme. Det er viktig å utpeke rad- og/eller kolonneoverskrifter for å vise sammenhengen mellom dem. Denne informasjonen gir kontekst til personer som bruker hjelpemidler. Husk at tabeller kun skal brukes til tabelldata. <hr> Finn ut mer om <a href="https://www.w3.org/WAI/tutorials/tables/">tilgjengelige tabeller.</a>',
    CONTRAST_ERROR: 'Denne teksten har ikke nok kontrast til bakgrunnen. Kontrastforholdet bør være minst 4,5:1 for normal tekst og 3:1 for stor tekst. <hr> Kontrastforholdet er <strong {r}>%(cratio)</strong> for følgende tekst: <strong {r}>%(sanitizedText)</strong>',
    CONTRAST_WARNING: 'Kontrasten i denne teksten er ukjent og må kontrolleres manuelt. Sørg for at teksten og bakgrunnen har sterke kontrastfarger. Kontrastforholdet bør være minst 4,5:1 for normal tekst og 3:1 for stor tekst. <hr> <strong>Vennligst se gjennom:</strong> %(sanitizedText)',
    CONTRAST_INPUT_ERROR: 'Teksten i denne inngangen har ikke nok kontrast til bakgrunnen. Kontrastforholdet bør være minst 4,5:1 for normal tekst og 3:1 for stor tekst. <hr> Kontrastforhold: <strong {r}>%(cratio)</strong>',
  },
};

export { nb as default };