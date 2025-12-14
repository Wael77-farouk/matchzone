"use client"
import React, { useState, useEffect } from 'react';
import { Trophy, Brain, Target, Award, ChevronRight, RotateCcw, Home } from 'lucide-react';

const GamesPage = () => {
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // لعبة كويز كرة القدم
  const footballQuiz = [
    { q: "من هو الهداف التاريخي لكأس العالم؟", options: ["ميسي", "رونالدو", "كلوزه", "بيليه"], correct: 2 },
    { q: "في أي عام فازت مصر بكأس الأمم الأفريقية للمرة الأولى؟", options: ["1957", "1959", "1962", "1965"], correct: 1 },
    { q: "من هو أكثر لاعب فاز بالكرة الذهبية؟", options: ["ميسي", "رونالدو", "كريستيانو", "مارادونا"], correct: 0 },
    { q: "كم عدد لاعبي كرة القدم في الملعب؟", options: ["9", "10", "11", "12"], correct: 2 },
    { q: "من فاز بكأس العالم 2018؟", options: ["ألمانيا", "فرنسا", "البرازيل", "الأرجنتين"], correct: 1 },
    { q: "ما هو لقب نادي ريال مدريد؟", options: ["الملكي", "البلوجرانا", "الريدز", "البياتي"], correct: 0 },
    { q: "من هو أفضل حارس مرمى في التاريخ؟", options: ["نوير", "كاسياس", "بوفون", "ياشين"], correct: 3 },
    { q: "كم مرة فازت البرازيل بكأس العالم؟", options: ["3", "4", "5", "6"], correct: 2 },
    { q: "من هو الملقب بـ 'الفرعون'؟", options: ["محمد صلاح", "أبو تريكة", "زيدان", "مرموش"], correct: 0 },
    { q: "في أي دوري يلعب محمد صلاح؟", options: ["الليجا", "البريميرليج", "الدوري الإيطالي", "البوندسليجا"], correct: 1 },
    { q: "من فاز بكأس العالم 2022؟", options: ["فرنسا", "الأرجنتين", "البرازيل", "إنجلترا"], correct: 1 },
    { q: "كم دقيقة مدة مباراة كرة القدم؟", options: ["80", "90", "100", "120"], correct: 1 },
    { q: "من هو الهداف التاريخي لليفربول؟", options: ["صلاح", "جيرارد", "فاولر", "راش"], correct: 3 },
    { q: "ما هي جنسية زين الدين زيدان؟", options: ["جزائرية", "فرنسية", "مغربية", "تونسية"], correct: 1 },
    { q: "من فاز بدوري أبطال أوروبا 2023؟", options: ["ريال مدريد", "مانشستر سيتي", "ليفربول", "بايرن"], correct: 1 },
    { q: "كم عدد بطولات يورو التي فازت بها إسبانيا؟", options: ["1", "2", "3", "4"], correct: 2 },
    { q: "من هو أصغر لاعب سجل في كأس العالم؟", options: ["بيليه", "مبابي", "ميسي", "رونالدو"], correct: 0 },
    { q: "ما هو ملعب برشلونة؟", options: ["سانتياجو برنابيو", "كامب نو", "الإتحاد", "الوندا"], correct: 1 },
    { q: "من هو قائد منتخب مصر الحالي؟", options: ["صلاح", "النني", "الشناوي", "تريزيجيه"], correct: 0 },
    { q: "كم لاعب احتياطي مسموح في المباراة؟", options: ["3", "5", "7", "9"], correct: 1 }
  ];

  // لعبة خمن اللاعب
  const guessPlayer = [
    { q: "أرجنتيني، رقم 10، فاز بكأس العالم 2022", options: ["ميسي", "دي ماريا", "أجويرو", "مارادونا"], correct: 0 },
    { q: "برتغالي، رقم 7، لعب في ريال ويوفنتوس", options: ["فيجو", "رونالدو", "كواريزما", "ديكو"], correct: 1 },
    { q: "مصري، لقبه الفرعون، يلعب في ليفربول", options: ["صلاح", "أبو تريكة", "زيزو", "مرموش"], correct: 0 },
    { q: "فرنسي، لقبه زيزو، مدرب ريال مدريد سابقاً", options: ["بلاتيني", "زيدان", "هنري", "بنزيما"], correct: 1 },
    { q: "برازيلي، أسطورة، 3 مرات بطل العالم", options: ["رونالدو", "رونالدينيو", "بيليه", "نيمار"], correct: 2 },
    { q: "ألماني، حارس بايرن، أفضل حارس في العالم", options: ["كان", "نوير", "تير شتيجن", "لينو"], correct: 1 },
    { q: "إنجليزي، قائد ليفربول السابق، رقم 8", options: ["لامبارد", "جيرارد", "شولز", "بيكام"], correct: 1 },
    { q: "سويدي، ضخم الجثة، لعب في عدة أندية كبرى", options: ["لارسون", "إبراهيموفيتش", "بيرج", "ليندلوف"], correct: 1 },
    { q: "إيطالي، أسطورة يوفنتوس، حارس مرمى", options: ["بوفون", "دونارومة", "كاسانو", "توتي"], correct: 0 },
    { q: "بلجيكي، لقبه KDB، يلعب في مانشستر سيتي", options: ["هازارد", "دي بروين", "لوكاكو", "كومباني"], correct: 1 },
    { q: "كرواتي، قلب خط وسط، قائد ريال مدريد", options: ["مودريتش", "راكيتيتش", "مانزوكيتش", "كوفاسيتش"], correct: 0 },
    { q: "بولندي، مهاجم برشلونة، هداف خطير", options: ["بيشتشيك", "ليفاندوفسكي", "بلاشيكوفسكي", "زيلينسكي"], correct: 1 },
    { q: "هولندي، مدافع ليفربول، من أفضل المدافعين", options: ["فان بيرسي", "فان دايك", "روبن", "سنايدر"], correct: 1 },
    { q: "نرويجي، مهاجم مانشستر سيتي، آلة أهداف", options: ["أوديجارد", "هالاند", "سولشاير", "ريس"], correct: 1 },
    { q: "فرنسي، مهاجم سريع، بطل العالم 2018", options: ["جريزمان", "مبابي", "بنزيما", "ديمبلي"], correct: 1 },
    { q: "أوروجوياني، مهاجم، عضاض شهير", options: ["كافاني", "سواريز", "فورلان", "جودين"], correct: 1 },
    { q: "إسباني، قلب دفاع ريال مدريد، قائد المنتخب", options: ["بيكيه", "راموس", "بويول", "ألبا"], correct: 1 },
    { q: "مغربي، لاعب باريس سان جيرمان، ماهر", options: ["زياش", "أشرف", "حكيمي", "بوفال"], correct: 2 },
    { q: "سنغالي، نجم بايرن ميونخ، سريع جداً", options: ["مانيه", "كوليبالي", "ساديو", "كيتا"], correct: 0 },
    { q: "كوري جنوبي، نجم توتنهام، هداف آسيوي", options: ["باك", "لي", "سون", "كيم"], correct: 2 }
  ];

  // لعبة مسيرة الأندية
  const clubCareer = [
    { q: "من لعب في: برشلونة، PSG، إنتر ميامي؟", options: ["نيمار", "ميسي", "سواريز", "رونالدينيو"], correct: 1 },
    { q: "من لعب في: مانشستر يونايتد، ريال مدريد، يوفنتوس؟", options: ["رونالدو", "بيكام", "بوجبا", "كريستيانو"], correct: 0 },
    { q: "من لعب في: تشيلسي، ريال مدريد، موناكو؟", options: ["هازارد", "كورتوا", "مودريتش", "درينتي"], correct: 0 },
    { q: "من لعب في: أرسنال، برشلونة، تشيلسي؟", options: ["فابريجاس", "هنري", "بيتيت", "فيرمايلين"], correct: 0 },
    { q: "من لعب في: يوفنتوس، ريال مدريد، ميلان؟", options: ["إنزاجي", "بيرلو", "زيدان", "كاكا"], correct: 2 },
    { q: "من لعب في: ساوثهامبتون، ليفربول، بايرن؟", options: ["مانيه", "فان دايك", "لامبرت", "كلاين"], correct: 0 },
    { q: "من لعب في: مانشستر سيتي، برشلونة، الأهلي؟", options: ["ياي توريه", "إيتو", "أبيدال", "بوسكيتس"], correct: 0 },
    { q: "من لعب في: إشبيلية، ريال مدريد، مانشستر يونايتد؟", options: ["راموس", "نافاس", "كاسيميرو", "فاران"], correct: 0 },
    { q: "من لعب في: ليفربول، برشلونة، أتلتيكو؟", options: ["سواريز", "توريس", "كوتينيو", "ماسكيرانو"], correct: 0 },
    { q: "من لعب في: دورتموند، مانشستر يونايتد، تشيلسي؟", options: ["ساتشو", "بوليسيتش", "جودون", "ميكيتاريان"], correct: 3 },
    { q: "من لعب في: باريس، ميلان، برشلونة، PSG؟", options: ["إبراهيموفيتش", "تياجو سيلفا", "كافاني", "لافيتزي"], correct: 0 },
    { q: "من لعب في: بايرن، إنتر ميلان، تشيلسي؟", options: ["روبن", "ريبيري", "باليك", "بوجبا"], correct: 2 },
    { q: "من لعب في: أياكس، يوفنتوس، ريال مدريد؟", options: ["فان در فارت", "سنايدر", "دي ليخت", "كلايفرت"], correct: 2 },
    { q: "من لعب في: مونديال، ليفربول، بايرن؟", options: ["ماني", "تياجو", "شاكيري", "كيتا"], correct: 1 },
    { q: "من لعب في: بورتو، تشيلسي، ريال مدريد؟", options: ["كارفاليو", "كاسياس", "بيبي", "فيريرا"], correct: 0 },
    { q: "من لعب في: روما، ريال مدريد، نابولي؟", options: ["إيجوين", "كالييخون", "أليسون", "سالا"], correct: 0 },
    { q: "من لعب في: فالنسيا، مانشستر يونايتد، ليون؟", options: ["دافيد سيلفا", "ماتا", "فيا", "باتيستوتا"], correct: 1 },
    { q: "من لعب في: أتلتيك بيلباو، برشلونة، أتلتيكو؟", options: ["فيا", "غريزمان", "توريس", "لويس سواريز"], correct: 1 },
    { q: "من لعب في: ساوثهامبتون، توتنهام، إنتر؟", options: ["إريكسن", "بيل", "مودريتش", "فان دي بيك"], correct: 0 },
    { q: "من لعب في: روما، ليفربول، إيفرتون؟", options: ["أليسون", "سالا", "ريتشارليسون", "كوتينيو"], correct: 0 }
  ];

  const games = [
    {
      id: 'quiz',
      title: 'كويز كرة القدم',
      icon: Trophy,
      description: 'اختبر معلوماتك في كرة القدم',
      color: 'from-blue-500 to-blue-600',
      questions: footballQuiz
    },
    {
      id: 'guess',
      title: 'خمن اللاعب',
      icon: Brain,
      description: 'تعرف على اللاعبين من الأوصاف',
      color: 'from-green-500 to-green-600',
      questions: guessPlayer
    },
    {
      id: 'career',
      title: 'مسيرة الأندية',
      icon: Target,
      description: 'خمن اللاعب من مسيرته',
      color: 'from-purple-500 to-purple-600',
      questions: clubCareer
    }
  ];

  const handleStartGame = (game: any) => {
    setCurrentGame(game);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === currentGame.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentGame.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameFinished(false);
  };

  const handleBackToMenu = () => {
    setCurrentGame(null);
  };

  if (currentGame && !gameFinished) {
    const question = currentGame.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / currentGame.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-cyan-500/20 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToMenu}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
              >
                <Home size={20} />
                <span className="hidden sm:inline">القائمة</span>
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {currentGame.title}
              </h2>
              <div className="flex items-center gap-2 text-yellow-400">
                <Award size={20} />
                <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${currentGame.color} transition-all duration-500 rounded-full`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-2 text-gray-400 text-sm">
            السؤال {currentQuestion + 1} من {currentGame.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyan-500/20">
            <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center leading-relaxed">
              {question.q}
            </h3>

            <div className="grid gap-4">
              {question.options.map((option: string, index: number) => {
                let bgColor = 'bg-gray-700/50 hover:bg-gray-600/50';
                let borderColor = 'border-gray-600';
                
                if (showResult) {
                  if (index === question.correct) {
                    bgColor = 'bg-green-500/20 border-green-500';
                    borderColor = 'border-green-500';
                  } else if (index === selectedAnswer) {
                    bgColor = 'bg-red-500/20 border-red-500';
                    borderColor = 'border-red-500';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`${bgColor} ${borderColor} border-2 rounded-xl p-4 sm:p-5 text-right font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:cursor-not-allowed`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <button
                onClick={handleNext}
                className={`mt-8 w-full bg-gradient-to-r ${currentGame.color} text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2`}
              >
                {currentQuestion < currentGame.questions.length - 1 ? 'السؤال التالي' : 'إنهاء اللعبة'}
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = (score / currentGame.questions.length) * 100;
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
      message = 'ممتاز! أنت خبير في كرة القدم! 🏆';
      emoji = '🏆';
    } else if (percentage >= 70) {
      message = 'رائع! معلوماتك جيدة جداً! ⭐';
      emoji = '⭐';
    } else if (percentage >= 50) {
      message = 'جيد! يمكنك التحسين! 👍';
      emoji = '👍';
    } else {
      message = 'حاول مرة أخرى! 💪';
      emoji = '💪';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-cyan-500/20 text-center">
          <div className="text-6xl sm:text-8xl mb-6">{emoji}</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            انتهت اللعبة!
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-gray-300">{message}</p>
          
          <div className="bg-gray-900/50 rounded-2xl p-6 sm:p-8 mb-8">
            <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
              {score}/{currentGame.questions.length}
            </div>
            <p className="text-gray-400">نقاطك</p>
            <div className="mt-4">
              <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${currentGame.color} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xl font-bold mt-2 text-cyan-400">{percentage.toFixed(0)}%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRestart}
              className={`flex-1 bg-gradient-to-r ${currentGame.color} text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2`}
            >
              <RotateCcw size={20} />
              إعادة المحاولة
            </button>
            <button
              onClick={handleBackToMenu}
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Home size={20} />
              القائمة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            🎮 ألعاب MatchZone
          </h1>
          <p className="text-center mt-2 text-gray-400">اختبر معلوماتك في كرة القدم</p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <div
                key={game.id}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-r ${game.color} p-6 sm:p-8 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                  <Icon size={48} className="mx-auto relative z-10" strokeWidth={2.5} />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-center">{game.title}</h3>
                  <p className="text-gray-400 text-center mb-6 leading-relaxed">
                    {game.description}
                  </p>
                  <div className="bg-gray-800/50 rounded-lg p-3 mb-6 text-center">
                    <p className="text-cyan-400 font-bold">20 سؤال</p>
                  </div>
                  <button
                    onClick={() => handleStartGame(game)}
                    className={`w-full bg-gradient-to-r ${game.color} text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.05] flex items-center justify-center gap-2`}
                  >
                    ابدأ اللعب
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold mb-4 text-center text-cyan-400">🎯 كيف تلعب؟</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <p className="text-gray-300">اختر لعبتك المفضلة</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <p className="text-gray-300">أجب على 20 سؤال</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <p className="text-gray-300">احصل على أفضل نتيجة</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-center">
            <Trophy className="mx-auto mb-3 text-blue-400" size={40} />
            <h4 className="text-2xl font-bold text-blue-400 mb-1">كويز كرة القدم</h4>
            <p className="text-gray-400 text-sm">أسئلة عامة ومعلومات</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
            <Brain className="mx-auto mb-3 text-green-400" size={40} />
            <h4 className="text-2xl font-bold text-green-400 mb-1">خمن اللاعب</h4>
            <p className="text-gray-400 text-sm">اختبر معرفتك باللاعبين</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 text-center">
            <Target className="mx-auto mb-3 text-purple-400" size={40} />
            <h4 className="text-2xl font-bold text-purple-400 mb-1">مسيرة الأندية</h4>
            <p className="text-gray-400 text-sm">تتبع مسيرات النجوم</p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-cyan-500/20 rounded-lg p-3">
                <Award className="text-cyan-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">نظام النقاط</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  احصل على نقطة عن كل إجابة صحيحة وتتبع تقدمك في كل لعبة
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 rounded-lg p-3">
                <RotateCcw className="text-purple-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-400 mb-2">إعادة المحاولة</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  يمكنك إعادة أي لعبة في أي وقت لتحسين نتيجتك
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full px-6 py-3">
            <p className="text-cyan-400 font-bold">
              🎮 60 سؤال • 3 ألعاب مختلفة • تحديات يومية
            </p>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            استمتع باختبار معلوماتك في كرة القدم مع MatchZone
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default GamesPage;