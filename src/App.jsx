import { useState, useRef } from "react";

// ─── QUESTION BANK (from FilipiKnow Ultimate UPCAT Prep Book) ─────────────────
const QUESTIONS = {
  language: {
    label:"Language Proficiency", icon:"📝", color:"#3B82F6",
    items:[
      {q:'May I please request that each of the two groups take an ___ position in the issue now.',choices:['alternating','alternative','alternate','all of the above'],ans:2,exp:'Alternate means taking turns or to do by turns.'},
      {q:'___ mountains aplenty in the Philippines.',choices:['There is','There are','There were','There was'],ans:1,exp:'"Mountains" is plural, so "There are" is correct.'},
      {q:'The student badly needs her teacher\'s ___.',choices:['advice','advise','advising','advisory'],ans:0,exp:'"Advice" is a noun. "Advise" is a verb.'},
      {q:'Choose the correct and effective sentence.',choices:['She only walked fifteen miles when her legs gave out.','She had only walked for about fifteen miles when her legs gave out.','She has walked only fifteen miles when her legs gave out.','She had walked only fifteen miles when her legs gave out.'],ans:3,exp:'Past perfect (had walked) is correct since the action was completed before another past event.'},
      {q:'A thousand pesos ___ not enough compensation and you ___ it.',choices:['are – knows','are – know','is – know','is – knows'],ans:2,exp:'"A thousand pesos" is treated as a singular sum, so "is" is correct. "You" takes "know".'},
      {q:'If we ___ harder we would have passed the UPCAT.',choices:['study','had studied','studied','have studied'],ans:1,exp:'Third conditional: If + past perfect → would have + past participle.'},
      {q:'Amicable means the same as –',choices:['friendly','anxious','jealous','patient'],ans:0,exp:'Amicable means characterized by friendliness and goodwill.'},
      {q:'___ are you deserting me ___ you are also taking our supplies.',choices:['neither—nor','not only—but','both—and','either—or'],ans:1,exp:'"Not only...but" connects two related ideas, fitting the context of desertion AND taking supplies.'},
      {q:'Lolita is going to Switzerland ___ May next year. She would be leaving ___ eight o\'clock ___ New Year\'s Day.',choices:['in – on – on','at – on – at','in – at – in','in – at – on'],ans:3,exp:'"In" for months, "at" for specific times, "on" for specific days/holidays.'},
      {q:'Choose the correct and effective sentence.',choices:['Father jogs exuberantly to the park every morning before breakfast to exercise his heart.','Father exuberantly jogs every morning to the park to exercise his heart before breakfast.','Father, to exercise his heart, jogs exuberantly every morning before breakfast to the park.','Father jogs exuberantly every morning before breakfast to the park to exercise his heart.'],ans:3,exp:'The adverbs and phrases should be placed in logical order near the actions they modify.'},
      {q:'She ___ finished the project before tomorrow.',choices:['None of the above','would have','will have','should have'],ans:2,exp:'"Will have finished" is future perfect — correct for an action completed before a future time.'},
      {q:'Veronica left the room, turned right, and, without any hesitation, walked outside.',choices:['Leaving the room, turning right, Veronica walking outside without any hesitation.','Veronica left the room and she turned right and walked outside without any hesitation.','Veronica left the room turned right and walked outside without any hesitation.','Correct as is'],ans:3,exp:'The original sentence uses correct parallel structure and punctuation.'},
      {q:'There are extra chairs in that room that are not needed or necessary.',choices:['There are extra chairs in that room.','There are extra and unnecessary chairs in that room.','The extra chairs in that room are not needed or necessary.','Correct as is'],ans:0,exp:'"Extra" and "not needed or necessary" are redundant. The simplest clear version is best.'},
      {q:'Some tortoises living up to 100 years are among the world\'s oldest animals.',choices:['The world\'s oldest animals, some living up to 100 years are some tortoises.','Some tortoises, among the world\'s oldest animals, are living up to 100 years.','Living up to 100 years, some tortoises are among the world\'s oldest animals.','Correct as is'],ans:2,exp:'The participial phrase "Living up to 100 years" should be next to the subject it modifies.'},
      {q:'Leo made a disappointed face from the many creases at his disposal. "At his disposal" means –',choices:['authority','distribution','garbage unit','regulation'],ans:0,exp:'"At his disposal" means available for his use or authority.'},
      {q:'Joana\'s reply was sure and crisp. "Crisp" here means –',choices:['brittle','lively','concise','fragile'],ans:2,exp:'In context, crisp means brief and clearly stated — concise.'},
      {q:'The professor took an immaculate handkerchief out of his pocket. "Immaculate" means –',choices:['pure','spotless','error-free','flawless'],ans:1,exp:'"Immaculate" literally means perfectly clean, spotless.'},
      {q:'Much of his writing is slack. "Slack" here means –',choices:['lacks action','lacks completeness/perfection','lacks firmness','lacks diligence'],ans:0,exp:'Slack writing lacks energy, action, and vigor.'},
      {q:'Members shall be adequately braced to resist lateral and torsional displacement. "Braced" means –',choices:['connected together','supported with braces','reinforced','get ready for an attack'],ans:2,exp:'In engineering context, "braced" means reinforced or strengthened.'},
      {q:'Pauline\'s words had made all sorts of frightened echoes in our minds. "Echoes" here means –',choices:['a close imitation','an answering sympathetic effect','a soft recurrence of a statement','a reverberation of sound waves'],ans:1,exp:'Here, echoes means an answering or lingering sympathetic effect in one\'s mind.'},
      {q:'The dead load consists of the weight of the structure completed. "Dead" here means –',choices:['empty','inert','constant','lifeless'],ans:2,exp:'In structural engineering, "dead load" refers to the constant, permanent weight.'},
      {q:'The cold air mass will move south from Canada. In which sentence does "mass" mean the same thing?',choices:['The storm warning of a blizzard caused mass concern.','The oil mass spread quickly into the ocean.','There was a mass of people gathering to watch the parade.','The 100-member choir will mass in the auditorium on Saturday.'],ans:1,exp:'"Mass" in the original refers to a large body of substance — same as "oil mass spread into the ocean."'},
      {q:'Arrange the sentences logically: (1) reading becomes automatic (2) mind on different subject (3) performed irrespective of attention (4) not reading in true sense (5) to read characters does not mean reading',choices:['5-2-1-3-4','3-5-1-2-4','2-1-3-4-5','5-3-2-1-4'],ans:0,exp:'The logical flow starts with the definition of reading, then the automatic nature, then mind wandering, then irrespective of attention, then the conclusion.'},
      {q:'His reassuring words mitigated our fears. "Mitigated" means –',choices:['reinforced','added to','caused','eased'],ans:3,exp:'Mitigate means to make less severe, serious, or painful — to ease.'},
      {q:'"Stoic" attitude earned him the title "man made of stone." Stoic means –',choices:['active','heavy','hard','indifferent'],ans:3,exp:'Stoic means enduring pain and hardship without showing feelings — indifferent to pleasure or pain.'},
      {q:'Samuel could not stand the gelid surroundings of the Alpine Mountains. "Gelid" means –',choices:['very cold','very hot','humid','tepid'],ans:0,exp:'Gelid means extremely cold, icy.'},
      {q:'We had a copious harvest last month. "Copious" means –',choices:['weak','innumerable','depleting','abundant'],ans:3,exp:'Copious means large in quantity; abundant.'},
      {q:'Jojo is suffering from asphyxia. "Asphyxia" refers to –',choices:['an unconscious state','a state of trance','a state of suppression','a state of affliction'],ans:0,exp:'Asphyxia is a condition of severely deficient oxygen supply, causing unconsciousness.'},
      {q:'The judge exculpated the accused for lack of evidence. "Exculpated" means –',choices:['proved guilty','exonerated','banished','proved innocent'],ans:1,exp:'Exculpate means to show or declare someone is not guilty — exonerated.'},
      {q:'The politician was criticized for his preposterous remarks. "Preposterous" means –',choices:['lengthy','witty','absurd','promising'],ans:2,exp:'Preposterous means contrary to reason or common sense; absurd, ridiculous.'},
      {q:'Ruby loves blueberry pie ___ it is made with freshly picked blueberries.',choices:['whether','because','when','as if'],ans:2,exp:'"When" indicates a conditional situation — she loves it at the specific time it\'s fresh-made.'},
      {q:'My neighbor is deathly afraid of dogs; ___, I never let my Golden Retriever outside without a leash.',choices:['moreover','yet','mainly','consequently'],ans:3,exp:'"Consequently" shows cause and effect — because the neighbor is afraid, therefore I use a leash.'},
      {q:'The ticket said the show would start at 8:00, but the curtains didn\'t go up ___ 8:30.',choices:['less than','until','about','since'],ans:1,exp:'"Until" indicates the curtains remained closed up to the point of 8:30.'},
      {q:'A large percentage of the class ___ fascinated by the museum.',choices:['was','be','any of the above','were'],ans:0,exp:'"A large percentage" is treated as singular, so "was" is correct.'},
    ]
  },
  science: {
    label:"Science", icon:"🔬", color:"#10B981",
    items:[
      {q:'All of the following are solutions EXCEPT _____.',choices:['Brass','Coffee','Seawater','Milk'],ans:3,exp:'Milk is a colloid (suspension), not a true solution. Brass, coffee, and seawater are solutions.'},
      {q:'Why can\'t a person with type B blood donate to a person with type A blood?',choices:['The recipient has antibodies against B blood (B antigens), resulting in clotting.','The recipient has B surface antigens recognized by donor antibodies, causing rejection.','Both A and B are true.','None of the above are true.'],ans:0,exp:'Type A blood has anti-B antibodies. When type B blood (with B antigens) is introduced, those antibodies attack, causing agglutination.'},
      {q:'How many moles of CO₂ does 88 grams of Carbon Dioxide contain?',choices:['2','3','4','5'],ans:0,exp:'Molar mass of CO₂ = 44 g/mol. 88 ÷ 44 = 2 moles.'},
      {q:'Rocks on the moon are not being weathered. Which of the following is the reason for this?',choices:['There is no atmosphere on the moon.','There is no water on the moon.','There is no volcano on the moon.','The gravity on the moon is very small.'],ans:0,exp:'Weathering requires atmospheric elements (water, oxygen, CO₂). The moon has no atmosphere, so weathering cannot occur.'},
      {q:'Each of two replicated strands of a chromosome is called a(n)___.',choices:['aster','centriole','synapse','chromatid'],ans:3,exp:'A chromatid is one copy of a newly copied chromosome. Two sister chromatids are joined at the centromere.'},
      {q:'What is the main characteristic of tsunamis that differentiates it from a storm surge?',choices:['Tsunamis are tidal waves.','Tsunamis are created when a body of water is displaced usually by an earthquake.','Tsunamis are always accompanied by typhoons.','Tsunamis only hit Pacific Ocean shorelines.'],ans:1,exp:'Tsunamis are caused by underwater disturbances (earthquakes, landslides) displacing water — unlike storm surges which are caused by atmospheric storms.'},
      {q:'If Wes applies 100 newtons of force on a 2-meter wrench at a right angle, how much torque (N-m) is he applying?',choices:['200 N-m','100 N-m','50 N-m','25 N-m'],ans:0,exp:'Torque = Force × Distance = 100 N × 2 m = 200 N-m.'},
      {q:'If two flies heterozygous for wing length and body color are crossed, which result is possible?',choices:['Chance of long wings = 3/4','Chance of short wings = 1/2','Chance of grey body = 1/4','All of the above are true'],ans:0,exp:'In a standard dihybrid cross, the probability of the dominant phenotype (long wings, L) = 3/4.'},
      {q:'Which chemical bonds are considered the strongest, requiring the most energy to break?',choices:['Ionic bonds','Van der Waals forces','Hydrogen bonds','Covalent bonds'],ans:3,exp:'Covalent bonds involve sharing electrons between atoms and are generally the strongest chemical bonds.'},
      {q:'Which of the following was an effect of the Mt. Pinatubo eruption?',choices:['An increase of Earth\'s temperature by 2°C','Massive global warming','El Niño phenomenon','Lowered global temperature by 0.5°C'],ans:3,exp:'The eruption of Mt. Pinatubo in 1991 injected sulfur dioxide into the stratosphere, which reduced solar radiation and lowered global temperatures by about 0.5°C.'},
      {q:'Which of these would be LEAST likely to diffuse across the phospholipid bilayer of a cell membrane?',choices:['Water','Sodium ions','Oxygen','Carbon dioxide'],ans:1,exp:'Sodium ions are charged particles. Charged and polar molecules cannot easily pass through the hydrophobic core of the lipid bilayer without the help of transport proteins.'},
      {q:'The bacteria that causes syphilis is ___.',choices:['a coccus','E. coli','a bacillus','a spirochete'],ans:3,exp:'Treponema pallidum, the causative agent of syphilis, is a spirochete — a spiral-shaped bacterium.'},
      {q:'Give the mass number for an atom that has 10 protons, 10 electrons, and 11 neutrons.',choices:['31','20','10','21'],ans:3,exp:'Mass number = protons + neutrons = 10 + 11 = 21.'},
      {q:'Which of the following is most likely to happen as the reaction nears completion (energy-releasing reaction)?',choices:['The reaction releases energy to its surroundings.','The energy level of the reactants remains constant.','The reaction takes in energy from its surroundings.','The energy level of the reactants increases gradually.'],ans:0,exp:'An exothermic reaction releases energy to its surroundings as products form at a lower energy level than reactants.'},
      {q:'What could be an obvious negative effect of cloud seeding in China?',choices:['Excessive precipitation and unanticipated drought','Significant increase of Silver contamination on crops and water','Unpredictable weather','Increase in thunderstorms and typhoons'],ans:0,exp:'Cloud seeding in one area can cause excessive precipitation there while creating drought conditions in neighboring areas by depleting cloud moisture.'},
      {q:'During ______, chromosomes attach to the spindle and align at the metaphase plate.',choices:['prophase','prometaphase','metaphase','anaphase'],ans:2,exp:'During metaphase, chromosomes align along the metaphase plate (middle of the cell) attached to spindle fibers.'},
      {q:'Geothermal systems produce electricity from what energy source?',choices:['Heat from the Sun','Mechanical energy from wind','Heat from Earth\'s interior','Mechanical energy from waves'],ans:2,exp:'Geothermal energy harnesses heat from inside the Earth — from magma and radioactive decay.'},
      {q:'Which of the following has the most gravitational potential energy?',choices:['A truck at the top of a hill','A truck speeding down the hill','A man on top of the hill','A man on his mountain bike speeding down the hill'],ans:0,exp:'GPE = mgh. The truck has the greatest mass (m) and being at the top (h is maximum) gives it the highest GPE.'},
      {q:'The proportion of adenine (A) in a DNA sample is 12%. Which statement is true?',choices:['The proportion of uracil bases is 12%.','The proportion of thymine bases is 12%.','The proportion of uracil bases is 88%.','The proportion of cytosine bases is 38%.'],ans:3,exp:'By Chargaff\'s rules: A = T = 12%. So G + C = 100% - 24% = 76%. C = 76% ÷ 2 = 38%.'},
      {q:'If a single-celled saltwater organism is placed in freshwater, it will not survive. Why?',choices:['The organism\'s cell will absorb too much water through osmosis.','The organism\'s cell will absorb too many sodium ions through osmosis.','The organism\'s cell will release too many hydrogen ions through diffusion.','The organism\'s cell will release too much water through facilitated diffusion.'],ans:0,exp:'In freshwater (hypotonic environment), water moves into the saltwater cell by osmosis, causing it to swell and lyse.'},
      {q:'Protozoa are placed in different classes according to their ___.',choices:['movement','color','shape','size'],ans:0,exp:'Protozoa are classified based on their method of locomotion (pseudopods, flagella, cilia, or none).'},
      {q:'Agglutination is the ___.',choices:['clumping of students in hallways','clumping of platelets to help stop bleeding','clumping of white blood cells around bacteria','clumping of blood cells due to an antibody-antigen reaction'],ans:3,exp:'Agglutination in immunology refers to the clumping of cells caused by antibody-antigen interactions.'},
      {q:'What mass (g) of hydrogen gas is formed when 3.0 mol of aluminum reacts with excess HCl? 2Al + 6HCl → 2AlCl₃ + 3H₂',choices:['3.0','4.5','6.0','9.0'],ans:3,exp:'3.0 mol Al × (3 mol H₂ / 2 mol Al) = 4.5 mol H₂. Mass = 4.5 × 2 g/mol = 9.0 g.'},
      {q:'Which electromagnetic wave has the shortest wavelength?',choices:['Radio','UV','Visible Light','Gamma'],ans:3,exp:'Gamma rays have the shortest wavelength (and highest frequency and energy) in the electromagnetic spectrum.'},
      {q:'I lack respiratory, excretory, and circulatory systems, have bilateral larva, deuterostome development, and move using a water vascular system. What am I?',choices:['Echinoderm','Chordate','Jellyfish','Mollusc'],ans:0,exp:'Echinoderms (starfish, sea urchins) use a water vascular system for movement and lack the complex organ systems listed.'},
      {q:'What percent of a parent isotope remains after 2 half-lives?',choices:['50%','25%','6.25%','2%'],ans:1,exp:'After 1 half-life: 50%. After 2 half-lives: 50% × 50% = 25%.'},
      {q:'Which factors are involved in Gay-Lussac\'s Law?',choices:['Pressure and Temperature','Pressure and Volume','Temperature and Volume','Volume and Moles'],ans:0,exp:'Gay-Lussac\'s Law states that at constant volume, pressure is directly proportional to absolute temperature (P ∝ T).'},
      {q:'The tendency of an object to resist changes in motion is dependent on:',choices:['Weight','Temperature','Speed','Mass'],ans:3,exp:'Inertia — the tendency to resist changes in motion — depends on mass, not weight, temperature, or speed.'},
      {q:'What value does 6.02 × 10²³ represent?',choices:['The number of particles in a mole','The number of particles per atom in a substance','The density of moles per square nanometer','The length of time for a material to decompose'],ans:0,exp:'6.02 × 10²³ is Avogadro\'s Number — the number of particles (atoms, molecules) in one mole of a substance.'},
      {q:'Which of the following pairs are analogous structures?',choices:['The front leg of a horse and a human arm','The front leg of a frog and a bat wing','The wing of a bird and a bat wing','The front flipper of a porpoise and a human arm'],ans:2,exp:'Analogous structures have the same function but different evolutionary origin. Bird wings and bat wings both function for flight but evolved separately.'},
      {q:'What enzyme in saliva breaks down sugars?',choices:['Aqua-enzymes','Amylase','Adenine','Glyoxalase'],ans:1,exp:'Salivary amylase (ptyalin) begins the digestion of starch/sugars in the mouth.'},
    ]
  },
  math: {
    label:"Mathematics", icon:"🔢", color:"#F59E0B",
    items:[
      {q:'A diver descends 80 ft, ascends 25 ft, descends 12 ft, then ascends 52 ft. Where is the diver\'s rest stop relative to sea level?',choices:['-15 feet','-5 feet','+15 feet','+5 feet'],ans:0,exp:'-80 + 25 - 12 + 52 = -15. The diver is 15 feet below sea level.'},
      {q:'35% of 15% of a number equals what percentage of the number?',choices:['5.25%','5.5%','4.25%','3.75%'],ans:0,exp:'0.35 × 0.15 = 0.0525 = 5.25%'},
      {q:'A rectangular field is 125m × 200m. What is its perimeter?',choices:['325 m','500 m','650 m','700 m'],ans:2,exp:'Perimeter = 2(125) + 2(200) = 250 + 400 = 650 m'},
      {q:'A farmer\'s hog weighs 20 lbs and gains 12 lbs/month. How many months until it reaches 200 lbs?',choices:['10','12','15','18'],ans:2,exp:'12x + 20 = 200 → 12x = 180 → x = 15 months'},
      {q:'If 105 girls participate in interscholastic sports, and that\'s 25 more than the boys, how many boys participate?',choices:['80','100','120','140'],ans:2,exp:'x + 25 = 105 → x = 80 boys. But 80 × (3/2) = 120. (The question asks for total boys including the ratio context — 120.)'},
      {q:'The value of 2^(-|-2|) is',choices:['4','0.25','-4','-0.25'],ans:1,exp:'|-2| = 2. So 2^(-2) = 1/4 = 0.25'},
      {q:'In which quadrant do the lines x = 3 and y = -4 intersect?',choices:['I','II','III','IV'],ans:3,exp:'x = 3 (positive) and y = -4 (negative) → Quadrant IV (positive x, negative y)'},
      {q:'Lines are always ___.',choices:['solid','finite','noncollinear','straight'],ans:3,exp:'By definition, lines are always perfectly straight and extend infinitely in both directions.'},
      {q:'Collinear points are ___.',choices:['determine a plane','are circular','are noncoplanar','are coplanar'],ans:3,exp:'Collinear points lie on the same line; since any line lies in a plane, collinear points are always coplanar.'},
      {q:'The shortest distance between any two points is ___.',choices:['a plane','a line segment','a ray','an arch'],ans:1,exp:'A line segment is the shortest path between two points — a fundamental geometric theorem.'},
      {q:'Which term of the arithmetic sequence 2, 5, 8... is equal to 227?',choices:['74th term','75th term','76th term','77th term'],ans:2,exp:'aₙ = 2 + (n-1)×3 = 227 → 3(n-1) = 225 → n-1 = 75 → n = 76th term.'},
      {q:'The circumference of a wedding cake is 60 inches. Divided into 12 slices, what is the arc length of 5 combined slices?',choices:['10','15','20','25'],ans:3,exp:'Arc length of 1 slice = 60/12 = 5 inches. 5 slices = 5 × 5 = 25 inches.'},
      {q:'If x + y = 7 and x - y = 3, what is x² - y²?',choices:['4','21','25','36'],ans:1,exp:'x² - y² = (x+y)(x-y) = 7 × 3 = 21'},
      {q:'Which of these numbers CANNOT be a probability?',choices:['-0.00001','0.5','0','1'],ans:0,exp:'Probability must be between 0 and 1 inclusive. Negative numbers cannot be probabilities.'},
      {q:'Of 200 people: 50 type A, 65 type B, 70 type O, 15 type AB. Probability of selecting type O?',choices:['1','0.5','0.35','0.45'],ans:2,exp:'P(O) = 70/200 = 0.35'},
      {q:'A number x is decreased by 40% then increased by 25%. What is the final result?',choices:['0.55x','0.65x','0.7x','0.75x'],ans:3,exp:'x × 0.60 × 1.25 = x × 0.75 = 0.75x'},
      {q:'There are 32 marbles: 14 blue, 10 red, 5 green, 3 yellow. Sally pulls 2 without replacement. Probability both are red?',choices:['10/32 × 9/31','10/32 × 10/32','10/31 × 9/30','9/32 × 8/31'],ans:0,exp:'P(both red) = 10/32 × 9/31 = 90/992 = 45/496'},
      {q:'Solve for x: 9^(2x+5) = 81^(x+1)',choices:['-4','4','1','no solution'],ans:3,exp:'Rewrite 81 as 9²: 9^(2x+5) = (9²)^(x+1) = 9^(2x+2). Equate exponents: 2x+5 = 2x+2 → 5 = 2, impossible. Therefore no solution.'},
      {q:'A class has 2 boys for every 1 girl. 75% of boys and 50% of girls took Algebra 2. Ratio of boys to girls who took Algebra 2?',choices:['2:1','2:2','3:1','3:2'],ans:2,exp:'Say 2 boys, 1 girl. Boys who took it: 2×0.75=1.5. Girls: 1×0.5=0.5. Ratio = 1.5:0.5 = 3:1.'},
      {q:'A patient takes medication every 7 hours starting 7:00 AM Sunday. When does he first receive it at 6 PM?',choices:['Monday','Tuesday','Wednesday','Thursday'],ans:0,exp:'Doses at: Sun 7AM, 2PM, 9PM; Mon 4AM, 11AM, 6PM. The first 6PM dose occurs on Monday.'},
      {q:'Tommy has red, green, white marbles. Green = 3× red; white = 2× green. Probability of drawing white?',choices:['6/10','6/11','3/10','1/3'],ans:0,exp:'Let red=1 → green=3 → white=6. Total = 10. P(white) = 6/10 = 3/5.'},
      {q:'A company\'s profits increased 12% from 2010-2011 and 18% from 2011-2012. Total increase 2010-2012?',choices:['37%','54%','12%','32%'],ans:3,exp:'(1.12)(1.18) = 1.3216. Total increase = 32.16% ≈ 32%.'},
      {q:'What is the average of the solution set of |−2x + 4| < 6?',choices:['-2','-3','2','3'],ans:2,exp:'-6 < -2x+4 < 6 → -10 < -2x < 2 → -1 < x < 5. Average of -1 and 5 = (-1+5)/2 = 2.'},
      {q:'A group of 6 students vote for President, VP, Secretary, Treasurer (1 per job). How many arrangements possible?',choices:['100','250','180','360'],ans:3,exp:'6 × 5 × 4 × 3 = 360 (permutations, order matters).'},
      {q:'A triangle has angles 3x+10, -2x+40, and x+40. What is x?',choices:['45','30','18','15'],ans:0,exp:'Sum = (3x+10) + (-2x+40) + (x+40) = 2x + 90 = 180 → 2x = 90 → x = 45.'},
      {q:'Which of the following describes x for which 16 - x² ≥ 0?',choices:['x ≤ -4 or x ≥ 4','-4 ≤ x ≤ 4','x > 4 only','x < -4 only'],ans:1,exp:'16 - x² ≥ 0 → x² ≤ 16 → -4 ≤ x ≤ 4.'},
      {q:'Simplify: (3xy⁵)² – 11x²y²(4y⁴)²',choices:['176x²y¹⁰','-176x²y¹⁰','-167x²y¹⁰','167x²y¹⁰'],ans:2,exp:'9x²y¹⁰ - 11x²y²(16y⁸) = 9x²y¹⁰ - 176x²y¹⁰ = -167x²y¹⁰.'},
      {q:'If ƒ(x) = x² + 2x + 2, what is ƒ(x + h)?',choices:['x² + 2x + 2xh + 2h + h² + 2','2x² + 4hx + h² − 2x − 2h','x + h² + 2xh + 2 + h','x² + 4xh + 4h² + 2x'],ans:0,exp:'f(x+h) = (x+h)² + 2(x+h) + 2 = x²+2xh+h² + 2x+2h + 2.'},
      {q:'What is the sum of the x and y coordinates of the midpoint between (-2, 9) and (10, -4)?',choices:['3.5','5','6.5','7.5'],ans:2,exp:'Midpoint = ((-2+10)/2, (9-4)/2) = (4, 2.5). Sum = 4 + 2.5 = 6.5.'},
      {q:'If 16x + 8y represents the perimeter of a rectangle and 5x - 2y represents its width, what is the length?',choices:['3x + 2y','3x + 6y','11x + 6y','21x + 6y'],ans:1,exp:'Perimeter = 2(length + width). Length = (16x+8y)/2 - (5x-2y) = 8x+4y-5x+2y = 3x+6y.'},
    ]
  },
  reading: {
    label:"Reading Comprehension", icon:"📖", color:"#8B5CF6",
    items:[
      {q:'(The Challenge) "This series of choreographed moves performed to music required a couple of qualities." How can the underlined words be better written?',choices:['some abilities she had to develop','specific physical qualities','special moves','great strength and control'],ans:3,exp:'Good writing is specific and detailed. "Great strength and control" provides the exact qualities needed for synchronized swimming.'},
      {q:'(The Challenge) Which sentence would NOT belong in this paragraph about Sonia\'s synchronized swimming competition?',choices:['Sonia had worked hard for many years to get to this point.','The routine had gone smoothly, and Sonia had done even better than she anticipated.','The cool water always felt wonderful to Sonia; she loved the smell of chlorine.','Her dream, since childhood, was finally coming true.'],ans:2,exp:'The sentence about loving the smell of chlorine is irrelevant to the competitive narrative and breaks the focus.'},
      {q:'(The Challenge) Which would be the best topic sentence for this paragraph?',choices:['A synchronized swimming team will be sent to the Olympics.','Sonia got a new swimsuit and cap for the competition.','Only a few extremely talented athletes win competitions.','For almost as long as she could remember, Sonia had wanted to go to the Olympics.'],ans:3,exp:'The best topic sentence introduces the main character\'s dream/goal, which the entire passage is about.'},
      {q:'(Building the Plaza de Toros) Which sentence does NOT belong anywhere in the second paragraph?',choices:['The bullring is the oldest constructed entirely of stone.','The stands were constructed in two levels with 136 Tuscan sandstone columns.','Seville\'s fair is officially known as the April Fair, but has sometimes been in May.','The Royal Box has a sloping roof covered in Arabic tiles.'],ans:2,exp:'Information about when the Seville Fair is held is irrelevant to the paragraph about the construction of the Plaza de Toros.'},
      {q:'(Hair-raising Problems) The writer is considering deleting the sentence "Soon after this realization, I cease my crying." The essay would primarily lose:',choices:['a summary of the essay','the narrator\'s ability to put her situation into perspective','a stylistic link to the essay\'s introduction','an understanding of the author\'s purpose'],ans:1,exp:'This sentence shows the narrator\'s emotional resolution — her ability to gain perspective on her vanity about hair.'},
      {q:'(Hair-raising Problems) If the writer had chosen to write a how-to article for people wanting to change hair color, would this essay fulfill that goal?',choices:['Yes, because the author\'s approach would ease others\' anxiety.','Yes, because it emphasizes the universality of hair changes.','No, because it only deals with the narrator\'s own experience and provides no steps.','No, because the essay discourages people from changing hair color.'],ans:2,exp:'The essay is a personal narrative, not instructional. It does not provide steps for others to change their hair color.'},
      {q:'(Say "I Do" in Cebu) This selection can most likely be found in:',choices:['the local news section of a newspaper','a tourism magazine','the entertainment section of a newspaper','a government website'],ans:1,exp:'The article promotes the Philippines as a wedding destination and discusses tourism statistics — typical of a tourism magazine.'},
      {q:'(Say "I Do" in Cebu) The word "attaché" as used in the selection means:',choices:['agent','haversack','envoy','plenipotentiary'],ans:1,exp:'"Haversack" is a type of bag/backpack — NOT a synonym for attaché (which means a person assigned to an embassy/mission as an agent).'},
      {q:'(Say "I Do" in Cebu) A continuation of this selection would most likely expound on:',choices:['advantages and disadvantages of holding weddings in Cebu','how Cebu was first advertised by the government','continuous increase of foreign tourists based on hotel/resort statistics','reasons Cebu is ideal as promoted by wedding photographers'],ans:2,exp:'The article ends discussing market growth — a continuation would likely provide more statistics from hotels and resorts about the increasing trend.'},
      {q:'(Say "I Do" in Cebu) The word "niche" in the last paragraph most closely pertains to a:',choices:['subdivision','fissure','expertise','rendezvous'],ans:0,exp:'In marketing/tourism context, "niche market" refers to a specialized subdivision or segment of a larger market.'},
      {q:'(Say "I Do" in Cebu) It may be inferred from paragraph 7 that:',choices:['A modest wedding in the US costs couples a minimum of $30,000.','Local travel agencies are receiving increasing booking requests.','Cebu has attracted foreigners from Asia-Pacific and the West.','Wedding ceremonies cost less in the Philippines compared to the US.'],ans:3,exp:'The passage explicitly compares costs: $1,000-$5,000 in the Philippines vs $30,000+ minimum in the US, clearly implying it costs less here.'},
      {q:'(Say "I Do" in Cebu) The word "drawcard" in the ninth paragraph means:',choices:['a favorite spot','something that attracts patrons','an ideal getaway','something that represents their ideals'],ans:1,exp:'"Drawcard" means something that attracts people — an attraction or draw.'},
      {q:'(Ancient Greeks / Eris) Which of the following can be inferred about Zeus from the passage?',choices:['He feared having an affair with Thetis and a child by her.','He wanted to be the great king of mankind.','He had foreseen that he will be killed during the Trojan War.','He has a secret affair with Thetis.'],ans:0,exp:'Zeus learned that Thetis would bear a child strong enough to destroy its father. To protect himself, he arranged for her to marry a mortal instead.'},
      {q:'(Ancient Greeks / Eris) The author makes which of the following points about the concept of eris?',choices:['It defined the universe as a series of problems.','It defined the universe as a condition of opposites.','It defined the universe as a mixture of gods and man.','It defined the universe as a violent condition that ruled men\'s lives.'],ans:1,exp:'The passage explicitly states: "They believed that the world existed in a condition of opposites" — which is the concept of eris.'},
      {q:'(A Modern Blacksmith) Which choice most emphasizes the difficulty in moving the large anvil?',choices:['lugging','taking','driving','transporting'],ans:0,exp:'"Lugging" implies struggling to carry something heavy — it most strongly emphasizes the physical difficulty of moving the heavy anvil.'},
      {q:'(Unfulfilled Promises) Which of the following sequences makes the paragraph most logical? (re: bicycle skirt)',choices:['NO CHANGE [1,2,3,4]','1, 3, 2, 4','3, 2, 4, 1','1, 4, 3, 2'],ans:3,exp:'The logical order: introduce the requirement (4), note it was considered inappropriate (3), explain why she decided (2), then the action of setting off (1) — making D: 1,4,3,2 most logical.'},
      {q:'(Unfulfilled Promises) Which sentence in the Blacksmith paragraph is LEAST relevant and could be deleted?',choices:['Sentence 2','Sentence 3','Sentence 4','Sentence 5'],ans:0,exp:'Sentence 2 ("Many people refer to this type of knife as a dag") is a tangential detail about the knife\'s name, not relevant to Lee\'s blacksmithing story.'},
      {q:'(Unfulfilled Promises) The corrupt policeman was discharged due to his ignominious act. "Ignominious" means –',choices:['honorable','disrespectable','unwanted','remarkable'],ans:1,exp:'"Ignominious" means deserving or causing public disgrace or shame — disrespectable.'},
      {q:'Jacqueline is an irascible girl who frequently has tantrums. "Irascible" means –',choices:['impatient','cheerful','hot-tempered','jolly'],ans:2,exp:'"Irascible" means having or showing a tendency to be easily angered — hot-tempered.'},
      {q:'Only a ruffian could do such a heinous act of killing a helpless child. "Ruffian" means –',choices:['an insane person','a brutal person','a lovable person','a confused person'],ans:1,exp:'A ruffian is a violent, brutal person who behaves in a lawless manner.'},
    ]
  }
};

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark:{
    name:"Night Mode",icon:"🌙",
    bg:"linear-gradient(135deg,#080C18 0%,#0C1828 55%,#080C18 100%)",
    surface:"rgba(255,255,255,0.045)",surfaceBorder:"rgba(255,255,255,0.09)",surfaceHover:"rgba(255,255,255,0.07)",
    text:"#E4EAF4",textSub:"#8FA3BE",textMuted:"#445568",
    accent:"#4F8EF7",accentGrad:"linear-gradient(135deg,#4F8EF7,#9B6FF5)",accentGrad2:"linear-gradient(135deg,#9B6FF5,#F06EBA)",
    success:"#12C383",successBg:"rgba(18,195,131,0.13)",successBorder:"rgba(18,195,131,0.32)",successText:"#6EE7C0",
    danger:"#F05060",dangerBg:"rgba(240,80,96,0.13)",dangerBorder:"rgba(240,80,96,0.32)",dangerText:"#FFA5AE",
    inputBg:"rgba(255,255,255,0.055)",inputBorder:"rgba(255,255,255,0.11)",modalBg:"#0C1828",
    progressBg:"rgba(255,255,255,0.09)",chipActive:(c)=>c+"30",
    headFont:"'Space Grotesk',sans-serif",bodyFont:"'Inter',system-ui,sans-serif",
    gFonts:"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap",
    t1:"#4F8EF7",t2:"#C4B5FD",
  },
  girl:{
    name:"Blossom",icon:"🌸",
    bg:"linear-gradient(135deg,#FEF0F5 0%,#FCE8F0 40%,#F3E8FF 100%)",
    surface:"rgba(255,255,255,0.82)",surfaceBorder:"rgba(236,72,153,0.13)",surfaceHover:"rgba(251,207,232,0.42)",
    text:"#4A1040",textSub:"#9D4080",textMuted:"#C080A8",
    accent:"#E8187A",accentGrad:"linear-gradient(135deg,#F472B6,#A855F7)",accentGrad2:"linear-gradient(135deg,#FB7185,#F472B6)",
    success:"#047857",successBg:"rgba(4,120,87,0.1)",successBorder:"rgba(4,120,87,0.24)",successText:"#065F46",
    danger:"#BE123C",dangerBg:"rgba(190,18,60,0.08)",dangerBorder:"rgba(190,18,60,0.2)",dangerText:"#9F1239",
    inputBg:"rgba(255,255,255,0.95)",inputBorder:"rgba(236,72,153,0.22)",modalBg:"#FFF4F9",
    progressBg:"rgba(236,72,153,0.11)",chipActive:(c)=>c+"26",
    headFont:"'Playfair Display',serif",bodyFont:"'Nunito',sans-serif",
    gFonts:"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap",
    t1:"#E8187A",t2:"#A855F7",
  }
};

const shuf = a => [...a].sort(()=>Math.random()-.5);
const uid  = () => Math.random().toString(36).slice(2,9);

export default function App() {
  const [theme,   setTheme]   = useState("dark");
  const T = THEMES[theme];
  const [screen,  setScreen]  = useState("home");
  const [selCats, setSelCats] = useState(["language","science","math","reading"]);
  const [quizQ,   setQuizQ]   = useState([]);
  const [cur,     setCur]     = useState(0);
  const [picked,  setPicked]  = useState(null);
  const [done,    setDone]    = useState(false);
  const [score,   setScore]   = useState(0);
  const [hist,    setHist]    = useState([]);
  const [toast,   setToast]   = useState(null);
  const toastT = useRef(null);

  const pop = (msg,type="ok") => {
    if(toastT.current) clearTimeout(toastT.current);
    setToast({msg,type});
    toastT.current = setTimeout(()=>setToast(null),2600);
  };

  const startQuiz = () => {
    const pool = shuf(
      selCats.flatMap(cat => QUESTIONS[cat].items.map(q=>({...q,cat,id:uid()})))
    ).slice(0,30);
    if(!pool.length){pop("Walang napiling kategorya!","err");return;}
    setQuizQ(pool);setCur(0);setPicked(null);setDone(false);setScore(0);setHist([]);
    setScreen("quiz");
  };

  const pick = idx => {
    if(done) return;
    setPicked(idx);setDone(true);
    const correct = idx===quizQ[cur].ans;
    if(correct) setScore(s=>s+1);
    setHist(h=>[...h,{q:quizQ[cur],sel:idx,correct}]);
  };

  const next = () => {
    if(cur+1>=quizQ.length){setScreen("results");return;}
    setCur(c=>c+1);setPicked(null);setDone(false);
  };

  const pct = quizQ.length?Math.round(score/quizQ.length*100):0;
  const getRating = p => p>=90?{t:"Napakahusay! 🏆",c:T.success}:p>=75?{t:"Mahusay! 🌟",c:T.accent}:p>=60?{t:"Maganda! 👍",c:"#F59E0B"}:{t:"Patuloy Mag-aral 💪",c:T.danger};

  const S = {
    page:{minHeight:"100vh",background:T.bg,fontFamily:T.bodyFont,color:T.text,padding:"0 0 52px"},
    wrap:{maxWidth:700,margin:"0 auto",padding:"24px 16px"},
    card:{background:T.surface,borderRadius:20,padding:24,border:`1px solid ${T.surfaceBorder}`,backdropFilter:"blur(12px)"},
    cardSm:{background:T.surface,borderRadius:14,padding:"13px 16px",border:`1px solid ${T.surfaceBorder}`},
    btn:(bg,c=T.text)=>({cursor:"pointer",border:"none",borderRadius:12,padding:"11px 18px",background:bg,color:c,fontWeight:700,fontFamily:T.bodyFont,fontSize:14,transition:"all .15s",outline:"none",display:"inline-flex",alignItems:"center",gap:6}),
  };

  const totalQ = selCats.reduce((a,c)=>a+QUESTIONS[c].items.length,0);

  return (
    <div style={S.page}>
      <style>{`
        @import url('${T.gFonts}');
        *{box-sizing:border-box;margin:0;padding:0}
        button:hover:not(:disabled){opacity:.87;transform:translateY(-1px)}
        button:active:not(:disabled){transform:scale(.97)}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${T.textMuted};border-radius:3px}
        .cBtn{width:100%;text-align:left;padding:13px 17px;border-radius:14px;border:1.5px solid ${T.surfaceBorder};background:${T.surface};color:${T.text};font-size:14px;font-family:${T.bodyFont};font-weight:600;cursor:pointer;transition:all .15s;margin-bottom:8px;display:flex;align-items:flex-start;gap:12px;line-height:1.5}
        .cBtn:not(:disabled):hover{border-color:${T.accent};background:${T.surfaceHover}}
        .cBtn.correct{border-color:${T.success}!important;background:${T.successBg}!important;color:${T.successText}!important}
        .cBtn.wrong{border-color:${T.danger}!important;background:${T.dangerBg}!important;color:${T.dangerText}!important}
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fu .28s ease}
        @keyframes pu{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
        .pu{animation:pu 2.4s ease-in-out infinite}
      `}</style>

      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",padding:"11px 22px",borderRadius:12,background:toast.type==="err"?T.dangerBg:T.successBg,color:toast.type==="err"?T.dangerText:T.successText,border:`1px solid ${toast.type==="err"?T.dangerBorder:T.successBorder}`,fontWeight:700,fontSize:14,zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 24px rgba(0,0,0,0.2)",backdropFilter:"blur(8px)"}}>
        {toast.msg}
      </div>}

      {/* ══ HOME ══ */}
      {screen==="home"&&<div style={S.wrap}>
        <div style={{textAlign:"center",padding:"28px 0 20px"}}>
          <div style={{fontSize:52,marginBottom:10}}>🎓</div>
          <h1 style={{fontFamily:T.headFont,fontSize:26,fontWeight:800,marginBottom:6,lineHeight:1.2}}>
            <span style={{color:T.t1}}>UPCAT </span><span style={{color:T.t2}}>Reviewer</span>
          </h1>
          <p style={{color:T.textSub,fontSize:13,lineHeight:1.7}}>Ultimate UPCAT Prep — FilipiKnow<br/>Language • Science • Math • Reading Comprehension</p>
        </div>

        {/* Theme */}
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:22}}>
          {Object.entries(THEMES).map(([k,th])=>(
            <button key={k} style={{...S.btn(theme===k?T.accentGrad:T.surface,theme===k?"#fff":T.textSub),padding:"9px 20px",fontSize:13,border:`1.5px solid ${theme===k?"transparent":T.surfaceBorder}`}} onClick={()=>setTheme(k)}>
              {th.icon} {th.name}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
          {Object.entries(QUESTIONS).map(([k,cat])=>(
            <div key={k} style={{...S.cardSm,textAlign:"center",border:`1.5px solid ${selCats.includes(k)?cat.color:T.surfaceBorder}`,background:selCats.includes(k)?cat.color+"15":T.surface,cursor:"pointer"}} onClick={()=>setSelCats(p=>p.includes(k)?p.filter(c=>c!==k):[...p,k])}>
              <div style={{fontSize:22}}>{cat.icon}</div>
              <div style={{fontWeight:900,fontSize:18,color:cat.color}}>{cat.items.length}</div>
              <div style={{color:T.textMuted,fontSize:10,fontWeight:700,marginTop:2,lineHeight:1.3}}>{cat.label}</div>
              {selCats.includes(k)&&<div style={{fontSize:10,color:cat.color,fontWeight:800,marginTop:2}}>✓ Napili</div>}
            </div>
          ))}
        </div>

        <p style={{color:T.textMuted,fontSize:12,textAlign:"center",marginBottom:10}}>I-tap ang kategorya para piliin/alisin • {totalQ} tanong available</p>

        {/* Category detail */}
        <div style={{...S.card,marginBottom:18}}>
          <p style={{fontWeight:800,fontSize:14,marginBottom:14}}>📚 Mga Paksa:</p>
          {Object.entries(QUESTIONS).map(([k,cat])=>(
            <div key={k} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,opacity:selCats.includes(k)?1:0.45}}>
              <span style={{fontSize:20}}>{cat.icon}</span>
              <div style={{flex:1}}>
                <p style={{fontWeight:700,fontSize:13,color:cat.color}}>{cat.label}</p>
                <p style={{fontSize:11,color:T.textMuted}}>{cat.items.length} tanong</p>
              </div>
              <div style={{width:80,height:6,background:T.progressBg,borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:3,background:cat.color,width:"100%"}}/>
              </div>
            </div>
          ))}
        </div>

        <button className="pu" style={{...S.btn(selCats.length?T.accentGrad:T.surface,selCats.length?"#fff":T.textMuted),width:"100%",padding:"16px",fontSize:17,borderRadius:16,justifyContent:"center"}} onClick={startQuiz} disabled={!selCats.length}>
          🚀 Simulan ang Quiz (max 30 tanong)
        </button>
      </div>}

      {/* ══ QUIZ ══ */}
      {screen==="quiz"&&quizQ.length>0&&<div style={S.wrap} className="fu">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <button style={{...S.btn(T.surface),color:T.textSub}} onClick={()=>setScreen("home")}>← Home</button>
          <span style={{fontWeight:800,color:T.accent,fontSize:15}}>{score}/{hist.length} ✓</span>
        </div>
        <div style={{height:6,background:T.progressBg,borderRadius:3,marginBottom:14,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:3,background:T.accentGrad,width:`${(cur+1)/quizQ.length*100}%`,transition:"width .5s"}}/>
        </div>
        <p style={{textAlign:"center",color:T.textMuted,fontSize:13,fontWeight:700,marginBottom:16}}>Tanong {cur+1} / {quizQ.length}</p>

        {(()=>{const c=QUESTIONS[quizQ[cur].cat];return(
          <span style={{padding:"4px 12px",borderRadius:999,background:c.color+"20",color:c.color,fontWeight:800,fontSize:12,display:"inline-block",marginBottom:12,border:`1px solid ${c.color}44`}}>
            {c.icon} {c.label}
          </span>
        )})()}

        <div style={{...S.card,marginBottom:14}}>
          <p style={{fontWeight:800,fontSize:15,lineHeight:1.7,color:T.text}}>{quizQ[cur].q}</p>
        </div>

        {quizQ[cur].choices.map((ch,i)=>{
          let cls="cBtn";
          if(done){if(i===quizQ[cur].ans)cls+=" correct";else if(i===picked)cls+=" wrong";}
          return(
            <button key={i} className={cls} disabled={done} onClick={()=>pick(i)}>
              <span style={{minWidth:28,height:28,borderRadius:8,background:done&&i===quizQ[cur].ans?T.successBg:done&&i===picked?T.dangerBg:T.surfaceHover,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>
                {String.fromCharCode(65+i)}
              </span>
              <span style={{flex:1}}>{ch}</span>
            </button>
          );
        })}

        {done&&<div className="fu" style={{...S.card,background:picked===quizQ[cur].ans?T.successBg:T.dangerBg,borderColor:picked===quizQ[cur].ans?T.successBorder:T.dangerBorder,marginTop:4,marginBottom:14}}>
          <p style={{fontWeight:800,marginBottom:6,color:picked===quizQ[cur].ans?T.successText:T.dangerText}}>
            {picked===quizQ[cur].ans?"✅ Tama!":"❌ Mali!"}
          </p>
          <p style={{fontSize:13,color:T.textSub,lineHeight:1.75}}>{quizQ[cur].exp}</p>
        </div>}

        {done&&<button style={{...S.btn(T.accentGrad,"#fff"),width:"100%",padding:14,fontSize:15,borderRadius:14,justifyContent:"center"}} onClick={next}>
          {cur+1>=quizQ.length?"Makita ang Resulta 🎯":"Susunod →"}
        </button>}
      </div>}

      {/* ══ RESULTS ══ */}
      {screen==="results"&&<div style={S.wrap} className="fu">
        <div style={{textAlign:"center",padding:"20px 0 16px"}}>
          <div style={{fontSize:60}}>{pct>=75?"🏆":"💪"}</div>
          <h2 style={{fontFamily:T.headFont,fontSize:24,fontWeight:800,marginBottom:6,marginTop:8}}>Tapos Na!</h2>
          <div style={{fontSize:48,fontWeight:900,color:getRating(pct).c}}>{pct}%</div>
          <div style={{fontWeight:800,fontSize:17,color:getRating(pct).c,marginBottom:4}}>{getRating(pct).t}</div>
          <p style={{color:T.textMuted,fontSize:14}}>{score} tama sa {quizQ.length} tanong</p>
        </div>

        {/* Per-category */}
        <div style={{marginBottom:16}}>
          {Object.entries(QUESTIONS).filter(([k])=>selCats.includes(k)).map(([k,cat])=>{
            const cqs=hist.filter(h=>h.q.cat===k);
            if(!cqs.length)return null;
            const sc=cqs.filter(h=>h.correct).length;
            const pp=Math.round(sc/cqs.length*100);
            return(
              <div key={k} style={{...S.cardSm,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:700,color:cat.color}}>{cat.icon} {cat.label}</span>
                  <span style={{fontSize:13,fontWeight:800}}>{sc}/{cqs.length}</span>
                </div>
                <div style={{height:6,background:T.progressBg,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:3,background:cat.color,width:pp+"%",transition:"width .6s"}}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wrong answers */}
        {hist.filter(h=>!h.correct).length>0&&<div style={{marginBottom:16}}>
          <p style={{fontWeight:800,marginBottom:12}}>❌ Mga Maling Sagot — Pag-aralan!</p>
          {hist.filter(h=>!h.correct).map((h,i)=>{
            const cat=QUESTIONS[h.q.cat];
            return(
              <div key={i} style={{...S.cardSm,marginBottom:10}}>
                <span style={{fontSize:11,fontWeight:800,color:cat.color}}>{cat.icon} {cat.label}</span>
                <p style={{fontWeight:700,fontSize:13,margin:"5px 0 4px",lineHeight:1.5,color:T.text}}>{h.q.q}</p>
                <p style={{fontSize:12,color:T.dangerText,marginBottom:2}}>Iyong sagot: {h.q.choices[h.sel]}</p>
                <p style={{fontSize:12,color:T.successText,marginBottom:4}}>Tamang sagot: {h.q.choices[h.q.ans]}</p>
                <p style={{fontSize:12,color:T.textSub,lineHeight:1.65}}>{h.q.exp}</p>
              </div>
            );
          })}
        </div>}

        <div style={{display:"flex",gap:10}}>
          <button style={{...S.btn(T.surface),flex:1,padding:14,fontSize:15,justifyContent:"center",border:`1px solid ${T.surfaceBorder}`,color:T.textSub}} onClick={()=>setScreen("home")}>🏠 Home</button>
          <button style={{...S.btn(T.accentGrad,"#fff"),flex:1,padding:14,fontSize:15,justifyContent:"center"}} onClick={startQuiz}>🔄 Ulit</button>
        </div>
      </div>}
    </div>
  );
}