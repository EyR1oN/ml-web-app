export const description =
  "Найкращої точності досягла модель з двома шарами BiLSTM. Загальна архітектура якої містить CNN шари з 32 та 64 фільтрами та ядром (3, 3), а також з шарами MaxPooling розміром (2,2) для виявлення ознак (feature extraction). Оскільки зображення містять перешкоду у вигляді шуму, то виявлення патернів символів є надзвичайно важливим. У першому експерименті була визначена звичайна CNN модель з одним шаром LSTM після тренування моделі впродовж 4 годин була досягнута точність 95 %. У другому експерименті використовувалась така сама CNN модель але з двома шарами LSTM, як результат точність зменшилась на 7 %, тобто стала рівна 88 %. Причиною цього може бути у перенавчанні моделі, оскільки модель стала більш складніша або недостатньо коректно підібрані гіпер параметри моделі. У третьому експерименті вже була використана CNN модель з одним шаром BiLSTM. Після тренування точність становила 94 %, майже ідентична точності з одним шаром звичайної LSTM. Четвертий експеримент передбачав використання вже двох шарів BiLSTM. Тренування останнього типу моделі зайняв 5 годин, точність була досягнута 98 %. Тобто на 4 % покращилась у порівнянні з одним шаром LSTM. Окрім цього були проведені ті самі експерименти, але тренування проходило вже проходило впродовж 200 епох. Як результат усі вищезазначені моделі стали чутливими до навчальних даних і недостатньо універсальними для нових даних. Іншими словами зазнали перенавчання. Для його уникнення додатково використовувались L1 та L2 регуляризатори, але на жаль вони не покращили дану ситуацію. Тому першопочатковий вибір кількості епох = 100 – був найкращим. На основі усіх проведених дослідів можна зробити висновок, що BiLSTM є набагато потужнішим інструментом, ніж LSTM у проблемі розпізнавання CAPTCHA з великою кількістю бінарного шуму. Для знаходження найкращої моделі було використано різну кількість шарів для певного типу рекурентних нейронних мереж, а також різну кількість епох.";

export const info = "These models are cool";

export const urls = {
  1: "https://ml-web-api-114dadf2bde1.herokuapp.com/lstm1",
  2: "https://ml-web-api-114dadf2bde1.herokuapp.com/lstm2",
  3: "https://ml-web-api-114dadf2bde1.herokuapp.com/bilstm1",
  4: "https://ml-web-api-114dadf2bde1.herokuapp.com/bilstm2",
};