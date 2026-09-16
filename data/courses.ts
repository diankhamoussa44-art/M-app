export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  completed: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
  level: string;
}

export const categories = [
  { id: 'math', name: 'Mathématiques', icon: 'calculator', color: '#6366F1' },
  { id: 'science', name: 'Sciences', icon: 'flask', color: '#10B981' },
  { id: 'langues', name: 'Langues', icon: 'language', color: '#F59E0B' },
  { id: 'histoire', name: 'Histoire', icon: 'book', color: '#EF4444' },
  { id: 'arts', name: 'Arts', icon: 'color-palette', color: '#EC4899' },
  { id: 'programmation', name: 'Programmation', icon: 'code', color: '#3B82F6' },
];

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Algèbre de Base',
    category: 'Mathématiques',
    description: 'Maîtrisez les fondements de l\'algèbre : équations, inéquations et systèmes linéaires.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    lessons: [
      {
        id: 'l1-1',
        title: 'Introduction aux variables',
        duration: '15 min',
        content: 'Une variable est un symbole qui représente une quantité inconnue ou changeante. En algèbre, nous utilisons des lettres comme x, y et z pour représenter ces valeurs.\n\nExemple :\nSi x = 5, alors x + 3 = 8\n\nLes variables nous permettent de généraliser des relations mathématiques et de résoudre des problèmes de manière systématique.',
        completed: true,
      },
      {
        id: 'l1-2',
        title: 'Les équations du premier degré',
        duration: '20 min',
        content: 'Une équation du premier degré à une inconnue est de la forme ax + b = 0, où a ≠ 0.\n\nPour résoudre :\n1. Isoler le terme contenant x\n2. Diviser par le coefficient de x\n\nExemple :\n2x + 6 = 14\n2x = 8\nx = 4\n\nVérifions : 2(4) + 6 = 14 ✓',
        completed: true,
      },
      {
        id: 'l1-3',
        title: 'Les systèmes d\'équations',
        duration: '25 min',
        content: 'Un système de deux équations à deux inconnues peut être résolu par substitution ou par combinaison linéaire.\n\nMéthode par substitution :\n1. Exprimer x en fonction de y dans une équation\n2. Substituer dans l\'autre équation\n3. Résoudre pour y\n4. Retrouver x\n\nExemple :\n{ x + y = 5\n{ 2x - y = 1\n\nDe la première : x = 5 - y\nSubstitution : 2(5 - y) - y = 1\n10 - 3y = 1 → y = 3 → x = 2',
        completed: false,
      },
      {
        id: 'l1-4',
        title: 'Inéquations et intervalles',
        duration: '18 min',
        content: 'Les inéquations fonctionnent comme les équations, mais attention au changement de sens lors de la multiplication ou division par un nombre négatif !\n\nExemple :\n-3x > 12\nx < -4 (sens changé !)\n\nIntervalles :\n[ a ; b ] = a ≤ x ≤ b (fermé)\n] a ; b [ = a < x < b (ouvert)',
        completed: false,
      },
    ],
    quizzes: [
      {
        id: 'q1-1',
        question: 'Quelle est la solution de 3x - 9 = 0 ?',
        options: ['x = 2', 'x = 3', 'x = -3', 'x = 9'],
        correctAnswer: 1,
      },
      {
        id: 'q1-2',
        question: 'Si a = 2 et b = -1, quelle est la valeur de a² + 2ab + b² ?',
        options: ['1', '4', '9', '0'],
        correctAnswer: 0,
      },
      {
        id: 'q1-3',
        question: 'L\'intervalle ]2; 5[ contient combien d\'entiers ?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
      },
    ],
    progress: 50,
    totalLessons: 4,
    completedLessons: 2,
    color: '#6366F1',
    level: 'Débutant',
  },
  {
    id: 'c2',
    title: 'Physique : Mécanique',
    category: 'Sciences',
    description: 'Découvrez les lois fondamentales du mouvement et de la dynamique.',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
    lessons: [
      {
        id: 'l2-1',
        title: 'Les trois lois de Newton',
        duration: '30 min',
        content: 'Première loi (Inertie) : Un objet reste dans son état de repos ou de mouvement uniforme à moins qu\'une force n\'agisse sur lui.\n\nDeuxième loi : F = ma\nLa force est égale à la masse multipliée par l\'accélération.\n\nTroisième loi (Action-Réaction) : À toute action correspond une réaction égale et opposée.',
        completed: true,
      },
      {
        id: 'l2-2',
        title: 'La gravitation universelle',
        duration: '22 min',
        content: 'Loi de Newton (1687) :\nF = G × (m₁ × m₂) / d²\n\nOù :\n- F = force gravitationnelle\n- G = 6.67 × 10⁻¹¹ N·m²/kg²\n- m₁, m₂ = masses des deux corps\n- d = distance entre les centres\n\nCette loi explique la chute des corps, les orbites planétaires et les marées.',
        completed: false,
      },
      {
        id: 'l2-3',
        title: 'Énergie cinétique et potentielle',
        duration: '25 min',
        content: 'Énergie cinétique : E_c = ½mv²\nÉnergie potentielle gravitationnelle : E_p = mgh\n\nPrincipe de conservation :\nE_m = E_c + E_p = constante\n\nExemple :\nUne balle de 0.5 kg lâchée de 10m :\nE_p initiale = 0.5 × 9.8 × 10 = 49 J\nAu sol : E_c = 49 J → v = √(2×49/0.5) ≈ 14 m/s',
        completed: false,
      },
    ],
    quizzes: [
      {
        id: 'q2-1',
        question: 'Quelle est l\'unité de la force dans le Système International ?',
        options: ['Watt', 'Pascal', 'Newton', 'Joule'],
        correctAnswer: 2,
      },
      {
        id: 'q2-2',
        question: 'Un objet de 2 kg accélère à 5 m/s². Quelle force est appliquée ?',
        options: ['2.5 N', '5 N', '10 N', '20 N'],
        correctAnswer: 2,
      },
      {
        id: 'q2-3',
        question: 'L\'énergie cinétique dépend de la masse et de...',
        options: ['la hauteur', 'la vitesse', 'la température', 'la pression'],
        correctAnswer: 1,
      },
    ],
    progress: 33,
    totalLessons: 3,
    completedLessons: 1,
    color: '#10B981',
    level: 'Intermédiaire',
  },
  {
    id: 'c3',
    title: 'Anglais pour Débutants',
    category: 'Langues',
    description: 'Apprenez l\'anglais depuis zéro avec des dialogues pratiques et du vocabulaire essentiel.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400',
    lessons: [
      {
        id: 'l3-1',
        title: 'Présentations de base',
        duration: '12 min',
        content: 'Salutations formelles :\n- Hello / Hi\n- Good morning / Good afternoon / Good evening\n- How do you do?\n\nSe présenter :\n- My name is... / I am...\n- I am from...\n- I am a student / teacher / engineer\n- Nice to meet you!\n\nDialogue :\nA: Hello, my name is Sarah.\nB: Hi Sarah, I\'m Tom. Nice to meet you!\nA: Nice to meet you too. Where are you from?\nB: I\'m from London.',
        completed: true,
      },
      {
        id: 'l3-2',
        title: 'Les nombres et la date',
        duration: '15 min',
        content: 'Nombres 1-20 :\none, two, three, four, five, six, seven, eight, nine, ten...\n\nDates :\n- Monday, Tuesday, Wednesday...\n- January, February, March...\n\nExemples :\n- Today is Monday, September 15th.\n- My birthday is on March 3rd.\n- The meeting is at 3 o\'clock.',
        completed: true,
      },
      {
        id: 'l3-3',
        title: 'Au restaurant',
        duration: '18 min',
        content: 'Dialogue au restaurant :\n\nServeur : Good evening! Are you ready to order?\nClient : Yes, I\'d like a pizza, please.\nServeur : Would you like a drink with that?\nClient : A glass of water, please.\nServeur : Anything else?\nClient : No, thank you.\n\nExpressions utiles :\n- I\'d like... = Je voudrais...\n- Could I have...? = Pourrais-je avoir...?\n- The bill, please = L\'addition, s\'il vous plaît',
        completed: false,
      },
    ],
    quizzes: [
      {
        id: 'q3-1',
        question: 'Comment dit-on "Je m\'appelle Marie" en anglais ?',
        options: ['I am Marie.', 'My name is Marie.', 'I call Marie.', 'Marie is me.'],
        correctAnswer: 1,
      },
      {
        id: 'q3-2',
        question: 'Quel jour vient après Thursday ?',
        options: ['Wednesday', 'Friday', 'Saturday', 'Tuesday'],
        correctAnswer: 1,
      },
      {
        id: 'q3-3',
        question: '"I\'d like a coffee" signifie :',
        options: ['Je n\'aime pas le café', 'Je voudrais un café', 'J\'aime le café', 'J\'ai un café'],
        correctAnswer: 1,
      },
    ],
    progress: 66,
    totalLessons: 3,
    completedLessons: 2,
    color: '#F59E0B',
    level: 'Débutant',
  },
  {
    id: 'c4',
    title: 'Histoire de France',
    category: 'Histoire',
    description: 'De la Révolution à nos jours, comprenez l\'histoire qui a façonné la France moderne.',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    lessons: [
      {
        id: 'l4-1',
        title: 'La Révolution française',
        duration: '28 min',
        content: 'La Révolution française (1789-1799) a bouleversé la société française.\n\nÉvénements clés :\n- 14 juillet 1789 : Prise de la Bastille\n- 26 août 1789 : Déclaration des Droits de l\'Homme\n- 1793 : Exécution de Louis XVI\n\nLes trois ordres :\n- Le Clergé (1er état)\n- La Noblesse (2e état)\n- Le Tiers-État (3e état)\n\nLa société d\'ordres fut remplacée par une société d\'égaux.',
        completed: false,
      },
      {
        id: 'l4-2',
        title: 'Napoléon Bonaparte',
        duration: '30 min',
        content: 'Napoléon Bonaparte (1769-1821) :\n\nConsulat (1799-1804) :\n- Coup d\'État du 18 brumaire\n- Constitution de l\'an VIII\n\nEmpire (1804-1814/1815) :\n- Couronnement le 2 décembre 1804\n- Code civil (1804)\n- Campagnes militaires (Austerlitz, Iéna...)\n- Défaite en Russie (1812)\n\nExil à Sainte-Hélène et mort en 1821.',
        completed: false,
      },
    ],
    quizzes: [
      {
        id: 'q4-1',
        question: 'En quelle année a eu lieu la prise de la Bastille ?',
        options: ['1788', '1789', '1790', '1791'],
        correctAnswer: 1,
      },
      {
        id: 'q4-2',
        question: 'Qui a rédigé le Code civil français ?',
        options: ['Robespierre', 'Napoléon', 'Louis XVI', 'Voltaire'],
        correctAnswer: 1,
      },
    ],
    progress: 0,
    totalLessons: 2,
    completedLessons: 0,
    color: '#EF4444',
    level: 'Intermédiaire',
  },
  {
    id: 'c5',
    title: 'Introduction à la Programmation',
    category: 'Programmation',
    description: 'Apprenez les bases de la programmation avec Python et résolvez des problèmes concrets.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
    lessons: [
      {
        id: 'l5-1',
        title: 'Variables et types de données',
        duration: '20 min',
        content: 'En Python, une variable se crée simplement :\n\nx = 10          # entier (int)\nprix = 19.99    # décimal (float)\nnom = "Alice"   # chaîne (str)\nactif = True    # booléen (bool)\n\nTypes principaux :\n- int : nombres entiers\n- float : nombres décimaux\n- str : chaînes de caractères\n- bool : True ou False\n- list : listes [1, 2, 3]\n- dict : dictionnaires {"clé": "valeur"}',
        completed: true,
      },
      {
        id: 'l5-2',
        title: 'Conditions et boucles',
        duration: '25 min',
        content: 'Conditions :\nif x > 0:\n    print("Positif")\nelif x == 0:\n    print("Zéro")\nelse:\n    print("Négatif")\n\nBoucle for :\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\nBoucle while :\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1',
        completed: true,
      },
      {
        id: 'l5-3',
        title: 'Fonctions et modules',
        duration: '22 min',
        content: 'Définir une fonction :\n\ndef saluer(nom):\n    return f"Bonjour, {nom} !"\n\nresultat = saluer("Marie")\n# Affiche : Bonjour, Marie !\n\nModules standards :\nimport math\nprint(math.sqrt(16))  # 4.0\n\nimport random\nprint(random.randint(1, 10))',
        completed: false,
      },
    ],
    quizzes: [
      {
        id: 'q5-1',
        question: 'Quel type de données est [1, 2, 3] en Python ?',
        options: ['tuple', 'list', 'dict', 'set'],
        correctAnswer: 1,
      },
      {
        id: 'q5-2',
        question: 'Quel mot-clé définit une fonction en Python ?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
      },
      {
        id: 'q5-3',
        question: 'Que fait range(3) ?',
        options: ['[0, 1, 2, 3]', '[1, 2, 3]', '[0, 1, 2]', '[3, 2, 1, 0]'],
        correctAnswer: 2,
      },
    ],
    progress: 66,
    totalLessons: 3,
    completedLessons: 2,
    color: '#3B82F6',
    level: 'Débutant',
  },
  {
    id: 'c6',
    title: 'Histoire de l\'Art',
    category: 'Arts',
    description: 'De la Renaissance à l\'art contemporain, voyagez à travers les mouvements artistiques majeurs.',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400',
    lessons: [
      {
        id: 'l6-1',
        title: 'La Renaissance',
        duration: '24 min',
        content: 'La Renaissance (XVe-XVIe siècle) marque le retour aux modèles antiques.\n\nCaractéristiques :\n- Perspective linéaire\n- Anatomie réaliste\n- Lumière douce (sfumato)\n\nArtistes majeurs :\n- Léonard de Vinci : La Joconde, La Cène\n- Michel-Ange : Chapelle Sixtine, David\n- Raphaël : Les Écoles d\'Athènes\n\nNaissance en Italie (Florence) puis diffusion en Europe.',
        completed: true,
      },
      {
        id: 'l6-2',
        title: 'L\'Impressionnisme',
        duration: '20 min',
        content: 'L\'Impressionnisme (1860-1890) révolutionne la peinture.\n\nTechniques :\n- Couleurs pures juxtaposées\n- Peinture en plein air\n- Capture de la lumière changeante\n\nArtistes clés :\n- Monet : Les Nymphéas, Impression, soleil levant\n- Renoir : Le Déjeuner des canotiers\n- Degas : Danseuses\n\nPremière exposition en 1874 à Paris.',
        completed: false,
      },
    ],
    quizzes: [
      {
        id: 'q6-1',
        question: 'Qui a peint La Joconde ?',
        options: ['Michel-Ange', 'Raphaël', 'Léonard de Vinci', 'Van Gogh'],
        correctAnswer: 2,
      },
      {
        id: 'q6-2',
        question: 'Quel mouvement est associé à Monet et Renoir ?',
        options: ['Surrealisme', 'Impressionnisme', 'Cubisme', 'Baroque'],
        correctAnswer: 1,
      },
    ],
    progress: 50,
    totalLessons: 2,
    completedLessons: 1,
    color: '#EC4899',
    level: 'Tous niveaux',
  },
];

export const userStats = {
  totalCourses: 6,
  coursesInProgress: 4,
  completedCourses: 0,
  totalLessons: 17,
  completedLessons: 7,
  quizzesTaken: 12,
  averageScore: 78,
  streak: 5,
  totalTime: '14h 30min',
};
