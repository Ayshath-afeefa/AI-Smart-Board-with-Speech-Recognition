export interface CourseContent {
  id: string;
  title: string;
  subject: string;
  content: string;
  type: 'text' | 'pdf' | 'document';
  summary: string[];
  criticalTakeaways: string[];
  readingProgress: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const courseMaterials: CourseContent[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    subject: 'Computer Science',
    content: `Machine Learning is a subset of artificial intelligence that focuses on the development of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. The fundamental principle behind machine learning is that systems can automatically learn and improve from experience without being explicitly programmed for every scenario.

There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled training data to learn a mapping function from input variables to output variables. Common examples include classification problems like email spam detection and regression problems like predicting house prices.

Unsupervised learning works with unlabeled data to discover hidden patterns or structures. Clustering algorithms like K-means and dimensionality reduction techniques like Principal Component Analysis are popular unsupervised learning methods. These techniques are particularly useful for exploratory data analysis and feature engineering.

Reinforcement learning involves an agent learning to make decisions by taking actions in an environment to maximize cumulative reward. This approach has been successfully applied to game playing, robotics, and autonomous systems. The agent learns through trial and error, receiving feedback in the form of rewards or penalties.

Key concepts in machine learning include overfitting, underfitting, bias-variance tradeoff, and cross-validation. Overfitting occurs when a model learns the training data too well, including noise, leading to poor generalization. Underfitting happens when a model is too simple to capture the underlying patterns in the data.

The machine learning workflow typically involves data collection, data preprocessing, feature selection, model selection, training, evaluation, and deployment. Data quality is crucial for successful machine learning projects, as poor data quality can lead to unreliable models regardless of the sophistication of the algorithms used.`,
    type: 'text',
    summary: [
      'Machine Learning is a subset of AI that enables systems to learn and improve from experience without explicit programming.',
      'Three main types exist: supervised learning (with labeled data), unsupervised learning (finding hidden patterns), and reinforcement learning (learning through rewards).',
      'Key challenges include overfitting (learning noise) and underfitting (too simple models).',
      'The ML workflow involves data collection, preprocessing, feature selection, model training, evaluation, and deployment.',
      'Data quality is crucial for successful machine learning projects.'
    ],
    criticalTakeaways: [
      'Machine learning systems automatically improve performance through experience rather than explicit programming.',
      'Supervised learning requires labeled training data to learn input-output mappings.',
      'Overfitting and underfitting are critical concepts that affect model performance and generalization.',
      'Data quality is fundamental to successful machine learning implementations.',
      'Cross-validation is essential for proper model evaluation and selection.'
    ],
    readingProgress: 0,
    duration: '8 min read',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Fundamentals of Financial Markets',
    subject: 'Finance',
    content: `Financial markets are platforms where buyers and sellers trade financial securities, commodities, and other fungible items at prices determined by supply and demand. These markets play a crucial role in the global economy by facilitating capital allocation, price discovery, and risk management.

The primary function of financial markets is to channel funds from savers to borrowers efficiently. When individuals or institutions have excess funds, they can invest in various financial instruments, while those needing capital can access these funds through the market. This process is essential for economic growth and development.

There are several types of financial markets, each serving different purposes. The money market deals with short-term debt securities with maturities of less than one year, including Treasury bills, commercial paper, and certificates of deposit. The capital market handles longer-term securities such as stocks and bonds, facilitating long-term investment and financing.

Stock markets, also known as equity markets, allow companies to raise capital by selling ownership shares to investors. Investors purchase stocks expecting to benefit from the company's growth through capital appreciation and dividends. Major stock exchanges include the New York Stock Exchange, NASDAQ, London Stock Exchange, and Tokyo Stock Exchange.

Bond markets facilitate the trading of debt securities where investors lend money to entities for a defined period at a fixed interest rate. Government bonds, corporate bonds, and municipal bonds are common types. Bonds are generally considered less risky than stocks but offer lower potential returns.

Foreign exchange markets, or forex markets, are where currencies are traded. This is the largest financial market globally, with daily trading volumes exceeding $6 trillion. Exchange rates fluctuate based on economic indicators, political stability, and market sentiment.

Market efficiency is a fundamental concept in finance, suggesting that asset prices reflect all available information. The Efficient Market Hypothesis proposes three forms of efficiency: weak, semi-strong, and strong, each representing different levels of information incorporation into prices.

Risk and return are inversely related in financial markets. Higher potential returns typically come with higher risk. Diversification is a key strategy for managing risk by spreading investments across different assets, sectors, or geographic regions to reduce overall portfolio risk.`,
    type: 'text',
    summary: [
      'Financial markets are platforms for trading securities where prices are determined by supply and demand.',
      'Primary function is channeling funds from savers to borrowers, facilitating capital allocation and economic growth.',
      'Money markets handle short-term debt (under 1 year), while capital markets deal with long-term securities.',
      'Stock markets allow companies to raise capital by selling ownership shares to investors.',
      'Bond markets facilitate trading of debt securities with fixed interest rates and defined periods.',
      'Forex markets are the largest globally, trading currencies with over $6 trillion daily volume.',
      'Market efficiency suggests asset prices reflect all available information.',
      'Risk and return are inversely related; diversification helps manage portfolio risk.'
    ],
    criticalTakeaways: [
      'Financial markets are essential for efficient capital allocation and economic growth.',
      'Different market types serve specific purposes: money markets for short-term, capital markets for long-term financing.',
      'Stock investments offer ownership and growth potential but with higher risk than bonds.',
      'The Efficient Market Hypothesis explains how information is incorporated into asset prices.',
      'Diversification is crucial for risk management in investment portfolios.',
      'Foreign exchange markets are the largest and most liquid financial markets globally.'
    ],
    readingProgress: 0,
    duration: '10 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '3',
    title: 'Quantum Physics: Wave-Particle Duality',
    subject: 'Physics',
    content: `Wave-particle duality is one of the most fundamental and counterintuitive concepts in quantum physics. It describes the phenomenon where quantum entities, such as photons and electrons, exhibit both wave-like and particle-like properties depending on how they are observed or measured.

The concept emerged from early 20th-century experiments that challenged classical physics. The photoelectric effect, explained by Einstein in 1905, demonstrated that light behaves as discrete packets of energy called photons, exhibiting particle-like properties. However, other experiments, such as the double-slit experiment, clearly showed that light also exhibits wave-like properties including interference and diffraction.

The double-slit experiment is perhaps the most famous demonstration of wave-particle duality. When light passes through two parallel slits, it creates an interference pattern on a screen behind the slits, characteristic of wave behavior. However, when detectors are placed at the slits to determine which path the light takes, the interference pattern disappears, and the light behaves like particles.

This duality extends beyond light to all quantum particles. Louis de Broglie proposed in 1924 that all matter has wave-like properties, with the wavelength inversely proportional to momentum. This was later confirmed experimentally with electron diffraction experiments, showing that electrons can create interference patterns just like waves.

The wave function, denoted by the Greek letter psi (ψ), is a mathematical description of the quantum state of a system. The square of the wave function's amplitude gives the probability density of finding a particle at a particular location. This probabilistic interpretation, developed by Max Born, is fundamental to quantum mechanics.

Heisenberg's uncertainty principle is closely related to wave-particle duality. It states that certain pairs of physical properties, such as position and momentum, cannot be simultaneously measured with perfect accuracy. The more precisely one property is known, the less precisely the other can be determined.

The Copenhagen interpretation, developed by Niels Bohr and Werner Heisenberg, suggests that quantum systems don't have definite properties until they are measured. The act of measurement causes the wave function to collapse, forcing the system to exhibit either wave-like or particle-like behavior.

Complementarity is another key principle introduced by Bohr, stating that wave and particle descriptions are complementary aspects of the same phenomenon. Both descriptions are necessary for a complete understanding, but they cannot be observed simultaneously in a single experiment.

Modern applications of wave-particle duality include electron microscopy, where the wave nature of electrons allows for much higher resolution than light microscopy. Quantum technologies such as quantum computing and quantum cryptography also rely on the fundamental principles of wave-particle duality.`,
    type: 'text',
    summary: [
      'Wave-particle duality describes quantum entities exhibiting both wave and particle properties depending on observation.',
      'The photoelectric effect demonstrated light\'s particle nature, while double-slit experiments showed wave properties.',
      'The double-slit experiment reveals that observation affects whether light behaves as waves or particles.',
      'De Broglie proposed all matter has wave properties, confirmed by electron diffraction experiments.',
      'The wave function (ψ) mathematically describes quantum states, with its square giving probability density.',
      'Heisenberg\'s uncertainty principle states position and momentum cannot be simultaneously measured precisely.',
      'The Copenhagen interpretation suggests quantum systems lack definite properties until measured.',
      'Complementarity principle states wave and particle descriptions are both necessary but cannot be observed simultaneously.'
    ],
    criticalTakeaways: [
      'Quantum entities fundamentally exhibit both wave and particle characteristics, challenging classical physics intuition.',
      'The act of measurement or observation determines which aspect (wave or particle) is revealed.',
      'The wave function provides a probabilistic description of quantum systems rather than deterministic predictions.',
      'Uncertainty principle is not due to measurement limitations but is a fundamental property of quantum systems.',
      'Wave-particle duality enables modern technologies like electron microscopy and quantum computing.',
      'Complementarity requires accepting that complete understanding needs both wave and particle descriptions.'
    ],
    readingProgress: 0,
    duration: '12 min read',
    difficulty: 'Advanced'
  },
  {
    id: '4',
    title: 'Cellular Respiration and Energy Production',
    subject: 'Biology',
    content: `Cellular respiration is the process by which cells break down glucose and other organic molecules to produce adenosine triphosphate (ATP), the universal energy currency of life. This complex biochemical process occurs in virtually all living organisms and is essential for maintaining cellular functions and life itself.

The overall equation for cellular respiration is: C6H12O6 + 6O2 → 6CO2 + 6H2O + ATP. This process is essentially the reverse of photosynthesis, where glucose is oxidized and oxygen is reduced, releasing energy that is captured in the form of ATP molecules.

Cellular respiration consists of three main stages: glycolysis, the citric acid cycle (also known as the Krebs cycle), and the electron transport chain. Each stage occurs in different cellular locations and contributes to the overall energy yield from glucose metabolism.

Glycolysis takes place in the cytoplasm and involves the breakdown of glucose into two molecules of pyruvate. This process does not require oxygen and produces a net gain of two ATP molecules and two NADH molecules. Glycolysis is an ancient metabolic pathway that likely evolved before oxygen became abundant in Earth's atmosphere.

The citric acid cycle occurs in the mitochondrial matrix and completely oxidizes the pyruvate molecules produced during glycolysis. Before entering the cycle, pyruvate is converted to acetyl-CoA by the enzyme pyruvate dehydrogenase. The cycle produces two ATP molecules, six NADH molecules, and two FADH2 molecules per glucose molecule.

The electron transport chain is located in the inner mitochondrial membrane and is where the majority of ATP is produced. NADH and FADH2 from previous stages donate electrons to protein complexes in the chain. As electrons move through the chain, protons are pumped across the membrane, creating a proton gradient that drives ATP synthesis through chemiosmosis.

Oxygen serves as the final electron acceptor in the electron transport chain, combining with electrons and protons to form water. This is why oxygen is essential for aerobic respiration and why we need to breathe continuously to supply our cells with oxygen.

The total theoretical yield from one glucose molecule is approximately 32-38 ATP molecules, though the actual yield is often lower due to energy costs of transporting molecules across membranes and other cellular processes. This represents about 40% efficiency in capturing the chemical energy available in glucose.

When oxygen is not available, cells can undergo anaerobic respiration or fermentation. Fermentation produces much less ATP (only 2 molecules per glucose) and results in byproducts such as lactic acid in animals or ethanol in yeast. This is why anaerobic exercise can only be sustained for short periods.

Cellular respiration is tightly regulated by various factors including the availability of substrates, the energy needs of the cell, and feedback inhibition by products. Key regulatory enzymes include phosphofructokinase in glycolysis and isocitrate dehydrogenase in the citric acid cycle.`,
    type: 'text',
    summary: [
      'Cellular respiration breaks down glucose to produce ATP, the universal energy currency of cells.',
      'The process consists of three stages: glycolysis (cytoplasm), citric acid cycle (mitochondrial matrix), and electron transport chain (inner mitochondrial membrane).',
      'Glycolysis produces 2 ATP and 2 NADH without requiring oxygen.',
      'The citric acid cycle completely oxidizes pyruvate, producing 2 ATP, 6 NADH, and 2 FADH2 per glucose.',
      'The electron transport chain produces the majority of ATP through chemiosmosis, using oxygen as the final electron acceptor.',
      'Total theoretical yield is 32-38 ATP molecules per glucose with about 40% efficiency.',
      'Anaerobic respiration/fermentation occurs without oxygen but produces much less ATP.',
      'The process is tightly regulated by substrate availability, energy needs, and feedback mechanisms.'
    ],
    criticalTakeaways: [
      'Cellular respiration is essential for life, converting glucose into usable cellular energy (ATP).',
      'The three-stage process maximizes energy extraction from glucose molecules.',
      'Oxygen is crucial as the final electron acceptor, which is why we need to breathe continuously.',
      'The electron transport chain and chemiosmosis produce the majority of cellular ATP.',
      'Anaerobic processes are much less efficient, explaining why sustained high-intensity exercise is difficult.',
      'Mitochondria are the powerhouses of cells, housing the most energy-productive stages of respiration.'
    ],
    readingProgress: 0,
    duration: '9 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '5',
    title: 'Renaissance Art and Cultural Revolution',
    subject: 'Art History',
    content: `The Renaissance, spanning roughly from the 14th to the 17th century, marked a profound cultural revolution that transformed European art, literature, philosophy, and science. This period, whose name means "rebirth" in French, represented a renewed interest in classical Greek and Roman culture, humanism, and individual expression.

The Renaissance began in Italy during the late 14th century, particularly in Florence, Venice, and Rome. Several factors contributed to its emergence, including the wealth accumulated by Italian city-states through trade, the patronage system that supported artists, and the influx of Byzantine scholars after the fall of Constantinople in 1453, who brought with them classical texts and knowledge.

Renaissance art is characterized by several revolutionary techniques and principles. Linear perspective, developed by Filippo Brunelleschi, allowed artists to create the illusion of three-dimensional space on two-dimensional surfaces. This mathematical approach to representing depth transformed painting and architectural drawing.

Chiaroscuro, the dramatic use of light and shadow, became a hallmark of Renaissance painting. Artists like Leonardo da Vinci and Caravaggio mastered this technique to create volume, drama, and emotional intensity in their works. The technique helped figures appear more three-dimensional and lifelike.

Humanism, a philosophical movement that emphasized human potential and achievements, profoundly influenced Renaissance art. Artists began to focus on human subjects, emotions, and individual personalities rather than purely religious themes. Portraits became increasingly popular, reflecting the growing importance placed on individual identity.

Leonardo da Vinci (1452-1519) epitomized the Renaissance ideal of the "universal genius." His works, including the Mona Lisa and The Last Supper, demonstrate perfect mastery of technique combined with deep psychological insight. His scientific studies of anatomy, engineering, and natural phenomena informed his artistic practice.

Michelangelo Buonarroti (1475-1564) was renowned for his sculptures, paintings, and architectural works. His David sculpture and the Sistine Chapel ceiling frescoes represent pinnacles of Renaissance achievement, combining technical mastery with profound spiritual and emotional expression.

Raphael (1483-1520) was celebrated for his harmonious compositions and idealized beauty. His School of Athens fresco perfectly embodies Renaissance values, depicting classical philosophers in a grand architectural setting that demonstrates perfect perspective and proportion.

The invention of oil painting techniques, particularly in Northern Europe by artists like Jan van Eyck, allowed for unprecedented detail and luminosity in artworks. This medium enabled artists to achieve subtle gradations of color and light that were impossible with traditional tempera paints.

Renaissance architecture, exemplified by Brunelleschi's dome of Florence Cathedral and Palladio's villas, revived classical principles of proportion, symmetry, and mathematical harmony. These buildings influenced architectural styles for centuries and established principles still used today.

The printing press, invented by Gutenberg around 1440, revolutionized the dissemination of Renaissance ideas. Art treatises, such as Leon Battista Alberti's writings on painting and architecture, could be widely distributed, spreading Renaissance principles throughout Europe.

The Renaissance fundamentally changed the role of the artist in society. Artists evolved from anonymous craftsmen to celebrated individuals whose personal styles and innovations were recognized and valued. This shift established the foundation for the modern concept of artistic genius and individual creativity.`,
    type: 'text',
    summary: [
      'The Renaissance (14th-17th century) was a cultural revolution emphasizing classical learning, humanism, and individual expression.',
      'It began in Italian city-states like Florence, supported by wealth from trade and patronage systems.',
      'Key artistic innovations included linear perspective, chiaroscuro (light/shadow), and oil painting techniques.',
      'Humanism shifted focus from purely religious themes to human subjects, emotions, and individual personalities.',
      'Leonardo da Vinci exemplified the "universal genius" ideal, combining artistic mastery with scientific inquiry.',
      'Michelangelo and Raphael created masterpieces that balanced technical skill with spiritual and emotional depth.',
      'Renaissance architecture revived classical principles of proportion, symmetry, and mathematical harmony.',
      'The printing press revolutionized the spread of Renaissance ideas and artistic treatises.',
      'Artists evolved from anonymous craftsmen to celebrated individuals, establishing modern concepts of artistic genius.'
    ],
    criticalTakeaways: [
      'The Renaissance fundamentally transformed European culture by reviving classical learning and emphasizing human potential.',
      'Linear perspective and chiaroscuro techniques revolutionized visual representation and remain fundamental to art today.',
      'Humanism shifted artistic focus from divine to human subjects, reflecting changing philosophical values.',
      'The patronage system enabled artistic innovation by providing financial support and creative freedom.',
      'Renaissance masters like Leonardo, Michelangelo, and Raphael set standards for artistic excellence that endure today.',
      'The period established the modern concept of the artist as an individual creative genius rather than anonymous craftsman.'
    ],
    readingProgress: 0,
    duration: '11 min read',
    difficulty: 'Intermediate'
  },
  {
    id: '6',
    title: 'Sustainable Development and Environmental Economics',
    subject: 'Environmental Science',
    content: `Sustainable development represents a paradigm shift in how we approach economic growth, environmental protection, and social equity. Defined by the Brundtland Commission in 1987 as "development that meets the needs of the present without compromising the ability of future generations to meet their own needs," this concept has become central to global policy and business strategy.

The three pillars of sustainable development—economic, environmental, and social—must be balanced to achieve true sustainability. Economic sustainability ensures that development is economically viable and contributes to long-term prosperity. Environmental sustainability requires that natural resources are used responsibly and ecosystems are protected. Social sustainability focuses on equity, human rights, and community well-being.

Environmental economics provides the theoretical framework for understanding the relationship between economic activity and environmental quality. Traditional economic models often failed to account for environmental costs, leading to market failures and unsustainable resource use. Environmental economics introduces concepts like externalities, natural capital, and ecosystem services to address these shortcomings.

Externalities are costs or benefits that affect parties not directly involved in an economic transaction. Pollution is a classic negative externality where the costs of environmental damage are borne by society rather than the polluting entity. Carbon pricing mechanisms, such as carbon taxes and cap-and-trade systems, are designed to internalize these external costs.

Natural capital refers to the world's stocks of natural assets, including geology, soil, air, water, and all living things. These assets provide ecosystem services that are essential for human survival and economic activity. Forests, for example, provide timber (a provisioning service), regulate climate (a regulating service), and offer recreational opportunities (a cultural service).

The concept of ecosystem services has revolutionized how we value nature economically. The Millennium Ecosystem Assessment identified four categories: provisioning services (food, water, timber), regulating services (climate regulation, water purification), cultural services (recreation, spiritual values), and supporting services (nutrient cycling, primary production).

Circular economy principles offer an alternative to the traditional linear "take-make-dispose" model. In a circular economy, waste is minimized through design, and materials are kept in use for as long as possible through reuse, repair, refurbishment, and recycling. This approach reduces resource consumption and environmental impact while creating new economic opportunities.

Green GDP and other alternative economic indicators attempt to account for environmental costs and benefits in national accounting. Traditional GDP measures economic activity but ignores environmental degradation and resource depletion. Green accounting methods adjust GDP to reflect the true cost of economic growth on natural capital.

The transition to renewable energy exemplifies sustainable development in practice. Solar, wind, and other renewable technologies have become increasingly cost-competitive with fossil fuels while providing environmental benefits and energy security. This transition requires significant investment but offers long-term economic and environmental advantages.

Corporate sustainability has evolved from a peripheral concern to a core business strategy. Companies are increasingly adopting Environmental, Social, and Governance (ESG) criteria in their operations and reporting. Sustainable business practices can reduce costs, improve efficiency, enhance brand reputation, and access new markets.

International cooperation is essential for addressing global environmental challenges. The Paris Agreement on climate change, the Convention on Biological Diversity, and the Sustainable Development Goals represent multilateral efforts to coordinate global action on sustainability. These agreements recognize that environmental problems transcend national boundaries and require collective solutions.

The role of technology in sustainable development cannot be overstated. Clean technologies, digital solutions, and innovative materials are enabling more efficient resource use and reduced environmental impact. However, technology alone is insufficient; it must be combined with appropriate policies, behavioral changes, and institutional reforms.

Measuring progress toward sustainability requires comprehensive indicators that go beyond traditional economic metrics. The UN Sustainable Development Goals provide a framework with 17 goals and 169 targets covering economic, social, and environmental dimensions. These indicators help track progress and identify areas needing attention.`,
    type: 'text',
    summary: [
      'Sustainable development balances economic growth, environmental protection, and social equity for present and future generations.',
      'The three pillars (economic, environmental, social) must be integrated to achieve true sustainability.',
      'Environmental economics addresses market failures by incorporating externalities, natural capital, and ecosystem services.',
      'Externalities like pollution require mechanisms such as carbon pricing to internalize environmental costs.',
      'Natural capital and ecosystem services provide essential benefits that must be valued and protected.',
      'Circular economy principles minimize waste through reuse, repair, and recycling, creating new economic opportunities.',
      'Green GDP and alternative indicators attempt to account for environmental costs in economic measurement.',
      'Renewable energy transition exemplifies sustainable development, offering economic and environmental benefits.',
      'Corporate sustainability and ESG criteria are becoming central to business strategy and operations.',
      'International cooperation through agreements like the Paris Accord is essential for global environmental challenges.',
      'Technology enables sustainability but must be combined with policy, behavioral, and institutional changes.',
      'Comprehensive indicators like the UN SDGs are needed to measure progress toward sustainability goals.'
    ],
    criticalTakeaways: [
      'Sustainable development requires integrating economic, environmental, and social considerations rather than treating them separately.',
      'Market failures occur when environmental costs are not reflected in prices, requiring policy interventions.',
      'Ecosystem services provide trillions of dollars in economic value and must be protected and valued appropriately.',
      'The circular economy offers a viable alternative to linear consumption models, reducing waste and creating value.',
      'Corporate sustainability is becoming essential for long-term business success and stakeholder expectations.',
      'Global environmental challenges require coordinated international action and multilateral agreements.',
      'Technology is a powerful tool for sustainability but must be deployed within appropriate policy frameworks.'
    ],
    readingProgress: 0,
    duration: '13 min read',
    difficulty: 'Advanced'
  }
];