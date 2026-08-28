async function getGenderOptions() {
  const genderOptions = [
    { id: "women", label: "Для неї" },
    { id: "men", label: "Для нього" },
    { id: "couples", label: "Для пар" }
  ];

  return genderOptions;
}

export default getGenderOptions;
