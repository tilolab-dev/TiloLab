async function getQuestions() {
  const questions = {
    women: [
      {
        id: "experience",
        text: "Чи досліджували раніше своє тіло за допомогою секс іграшок?",
        answers: [
          { id: "first_toy_women", text: "Ніяк не можу наважитись" },
          { id: "inactive_user_women", text: "Не активний користувач" },
          { id: "profi_level_women", text: "Постійно експерементую" }
        ]
      },
      {
        id: "control",
        text: "Як бажаєш керувати?",
        answers: [
          { id: "toy_women", text: "Кнопкою на девайсі" },
          { id: "app_women", text: "Через смартфон" },
          { id: "remote_control_women", text: "Пультом" }
        ]
      },
      {
        id: "intensity",
        text: "З якою інтенсивністю любиш отримувати задоволення?",
        answers: [
          { id: "light_mode_women", text: "Легка" },
          { id: "medium_power_women", text: "Середня" },
          { id: "high_intensity_women", text: "Максимальний драйв" }
        ]
      },
      {
        id: "focus",
        text: "Де твій фокус задоволення?",
        answers: [
          { id: "clitors_women", text: "Клітор" },
          { id: "anal_women", text: "Анал" },
          { id: "vagina_women", text: "Піхва" }
        ],
        multipleSelect: true,
        maxSelect: 3
      },
      {
        id: "format",
        text: "Який формат задоволення обираєш?",
        answers: [
          { id: "vacuum_women", text: "Вакуумний" },
          { id: "vibro_women", text: "Вібруючий" },
          { id: "motion_women", text: "Рухомий" }
        ],
        multipleSelect: true,
        maxSelect: 2
      }
    ],
    men: [
      {
        id: "experience_men",
        text: "Чи досліджував раніше своє тіло за допомогою секс іграшок?",
        answers: [
          { id: "first_toy_men", text: "Ніяк не можу наважитись" },
          { id: "inactive_user_men", text: "Не активний користувач" },
          { id: "profi_level_men", text: "Постійно експерементую" }
        ]
      },
      {
        id: "control_men",
        text: "Як бажаєш керувати?",
        answers: [
          { id: "toy_men", text: "Кнопкою на девайсі" },
          { id: "app_men", text: "Через смартфон" },
          { id: "remote_control_men", text: "Пультом" }
        ]
      },
      {
        id: "intensity_men",
        text: "З якою інтенсивністю любиш отримувати задоволення?",
        answers: [
          { id: "light_mode_men", text: "Легка" },
          { id: "medium_power_men", text: "Середня" },
          { id: "high_intensity_men", text: "Максимальний драйв" }
        ]
      },
      {
        id: "focus_men",
        text: "Де твій фокус задоволення?",
        answers: [
          { id: "dick_men", text: "Пеніс" },
          { id: "penis_head_men", text: "Голівка" },
          { id: "balls_men", text: "Мошонка" },
          { id: "anal_men", text: "Анал" }
        ],
        multipleSelect: true,
        maxSelect: 2
      },
      {
        id: "preference_men",
        text: "Що обираєш?",
        answers: [
          { id: "masturbator_men", text: "Мастурбацію" },
          { id: "continuation_men", text: "Подовження процесу" },
          { id: "vibro_men", text: "Вібрацію" }
        ],
        multipleSelect: true,
        maxSelect: 2
      }
    ],
    couples: [
      {
        id: "experience_couples",
        text: "Чи доповнюєте ви своє життя секс іграшками?",
        answers: [
          { id: "profi_level_couple", text: "Так, любимо різноманіття" },
          { id: "inactive_user_couple", text: "Використовуємо за настроем" },
          { id: "first_toy_couple", text: "Тільки починаємо знайомство" }
        ]
      },
      {
        id: "focus_couples",
        text: "Хто у фокусі стимуляції?",
        answers: [
          { id: "he_couple", text: "Він" },
          { id: "she_couple", text: "Вона" },
          { id: "them_couple", text: "Обидва" }
        ]
      },
      {
        id: "intensity_couples",
        text: "З якою інтенсивністю любите отримувати задоволення?",
        answers: [
          { id: "light_mode_couple", text: "Легка" },
          { id: "medium_power_couple", text: "Середня" },
          { id: "high_intensity_couple", text: "Максимальний драйв" }
        ]
      },
      {
        id: "format_couples",
        text: "Формат задоволення?",
        answers: [
          { id: "toys_couple", text: "Іграшки" },
          { id: "petting_couple", text: "Пестощі" },
          { id: "bdsm_couple", text: "БДСМ елементи" }
        ],
        multipleSelect: true,
        maxSelect: 2
      },
      {
        id: "usage_couples",
        text: "Де плануєте користуватись?",
        answers: [
          { id: "home_couple", text: "Вдома разом" },
          { id: "distance_couple", text: "На відстані" },
          { id: "walk_couple", text: "На прогулянці з партнером" }
        ]
      },
      {
        id: "type_couples",
        text: "Який тип девайсу вас цікавить?",
        answers: [
          { id: "vibrating_couples", text: "Вібруючий" },
          { id: "remote_couples", text: "З керуванням на відстані" },
          { id: "dual_couples", text: "Подвійної стимуляції" }
        ]
      }
    ]
  };

  return questions;
}

export default getQuestions;
