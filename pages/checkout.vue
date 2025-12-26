<template>
  <!-- <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-10"> -->
  <section class="bg-white py-8 antialiased dark:bg-[var(--dark-alter-color)] md:py-10">
    <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16 gap-5">
        <div class="min-w-0 flex-1 space-y-8">
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Контактна інформація
            </h2>

            <div v-if="contactInfoState" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="relative">
                <label
                  for="your_name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Ім'я
                </label>
                <input
                  id="your_name"
                  v-model="name"
                  type="text"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Введіть ім'я"
                />
              </div>

              <div>
                <label
                  for="your_surname"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  По батькові
                </label>
                <input
                  id="your_surname"
                  v-model="surname"
                  type="text"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Введіть по батькові"
                />
              </div>

              <div>
                <label
                  for="your_family"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Прізвище
                </label>
                <input
                  id="your_family"
                  v-model="familyName"
                  type="text"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Введіть прізвище"
                />
              </div>

              <div>
                <label
                  for="phone-input-3"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Номер телефону
                </label>
                <div class="flex items-center">
                  <div
                    id="dropdown-phone-button-3"
                    data-dropdown-toggle="dropdown-phone-3"
                    class="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <svg fill="none" aria-hidden="true" class="me-2 h-4 w-4" viewBox="0 0 20 15">
                      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                      <mask
                        id="b"
                        style="mask-type: luminance"
                        width="20"
                        height="15"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                      >
                        <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                      </mask>
                      <g mask="url(#b)">
                        <path fill="#0057B7" d="M0 .5h19.6v7H0z" />
                        <path fill="#FFD700" d="M0 7.5h19.6v7H0z" />
                      </g>
                    </svg>

                    +380
                  </div>
                  <div
                    id="dropdown-phone-3"
                    class="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                  >
                    <ul
                      class="p-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdown-phone-button-2"
                    >
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <span class="inline-flex items-center">
                            <svg
                              fill="none"
                              aria-hidden="true"
                              class="me-2 h-4 w-4"
                              viewBox="0 0 20 15"
                            >
                              <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              <mask
                                id="a"
                                style="mask-type: luminance"
                                width="20"
                                height="15"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                              >
                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              </mask>
                              <g mask="url(#a)">
                                <path
                                  fill="#D02F44"
                                  fill-rule="evenodd"
                                  d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                  clip-rule="evenodd"
                                />
                                <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                <g filter="url(#filter0_d_343_121520)">
                                  <path
                                    fill="url(#paint0_linear_343_121520)"
                                    fill-rule="evenodd"
                                    d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                    clip-rule="evenodd"
                                  />
                                </g>
                              </g>
                              <defs>
                                <linearGradient
                                  id="paint0_linear_343_121520"
                                  x1=".933"
                                  x2=".933"
                                  y1="1.433"
                                  y2="6.1"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#fff" />
                                  <stop offset="1" stop-color="#F0F0F0" />
                                </linearGradient>
                                <filter
                                  id="filter0_d_343_121520"
                                  width="6.533"
                                  height="5.667"
                                  x=".933"
                                  y="1.433"
                                  color-interpolation-filters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  />
                                  <feOffset dy="1" />
                                  <feColorMatrix
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                                  />
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_343_121520"
                                  />
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_343_121520"
                                    result="shape"
                                  />
                                </filter>
                              </defs>
                            </svg>
                            United States (+1)
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <span class="inline-flex items-center">
                            <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                              <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              <mask
                                id="a"
                                style="mask-type: luminance"
                                width="20"
                                height="15"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                              >
                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              </mask>
                              <g mask="url(#a)">
                                <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                <path
                                  fill="#fff"
                                  fill-rule="evenodd"
                                  d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
                                  clip-rule="evenodd"
                                />
                                <path
                                  stroke="#DB1F35"
                                  stroke-linecap="round"
                                  stroke-width=".667"
                                  d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                                />
                                <path
                                  fill="#E6273E"
                                  fill-rule="evenodd"
                                  d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                  clip-rule="evenodd"
                                />
                              </g>
                            </svg>
                            United Kingdom (+44)
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <span class="inline-flex items-center">
                            <svg
                              class="me-2 h-4 w-4"
                              fill="none"
                              viewBox="0 0 20 15"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              <mask
                                id="a"
                                style="mask-type: luminance"
                                width="20"
                                height="15"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                              >
                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              </mask>
                              <g mask="url(#a)">
                                <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                <path
                                  fill="#fff"
                                  stroke="#fff"
                                  stroke-width=".667"
                                  d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                                />
                                <path
                                  fill="url(#paint0_linear_374_135177)"
                                  fill-rule="evenodd"
                                  d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z"
                                  clip-rule="evenodd"
                                />
                                <path
                                  fill="url(#paint1_linear_374_135177)"
                                  fill-rule="evenodd"
                                  d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z"
                                  clip-rule="evenodd"
                                />
                                <path
                                  fill="#fff"
                                  fill-rule="evenodd"
                                  d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                  clip-rule="evenodd"
                                />
                              </g>
                              <defs>
                                <linearGradient
                                  id="paint0_linear_374_135177"
                                  x1="0"
                                  x2="0"
                                  y1=".5"
                                  y2="7.5"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#fff" />
                                  <stop offset="1" stop-color="#F0F0F0" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_374_135177"
                                  x1="0"
                                  x2="0"
                                  y1=".5"
                                  y2="7.033"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#FF2E3B" />
                                  <stop offset="1" stop-color="#FC0D1B" />
                                </linearGradient>
                              </defs>
                            </svg>
                            Australia (+61)
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <span class="inline-flex items-center">
                            <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                              <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              <mask
                                id="a"
                                style="mask-type: luminance"
                                width="20"
                                height="15"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                              >
                                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                              </mask>
                              <g mask="url(#a)">
                                <path
                                  fill="#262626"
                                  fill-rule="evenodd"
                                  d="M0 5.167h19.6V.5H0v4.667z"
                                  clip-rule="evenodd"
                                />
                                <g filter="url(#filter0_d_374_135180)">
                                  <path
                                    fill="#F01515"
                                    fill-rule="evenodd"
                                    d="M0 9.833h19.6V5.167H0v4.666z"
                                    clip-rule="evenodd"
                                  />
                                </g>
                                <g filter="url(#filter1_d_374_135180)">
                                  <path
                                    fill="#FFD521"
                                    fill-rule="evenodd"
                                    d="M0 14.5h19.6V9.833H0V14.5z"
                                    clip-rule="evenodd"
                                  />
                                </g>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_374_135180"
                                  width="19.6"
                                  height="4.667"
                                  x="0"
                                  y="5.167"
                                  color-interpolation-filters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  />
                                  <feOffset />
                                  <feColorMatrix
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                                  />
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_374_135180"
                                  />
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_374_135180"
                                    result="shape"
                                  />
                                </filter>
                                <filter
                                  id="filter1_d_374_135180"
                                  width="19.6"
                                  height="4.667"
                                  x="0"
                                  y="9.833"
                                  color-interpolation-filters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  />
                                  <feOffset />
                                  <feColorMatrix
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                                  />
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_374_135180"
                                  />
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_374_135180"
                                    result="shape"
                                  />
                                </filter>
                              </defs>
                            </svg>
                            Germany (+49)
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <span class="inline-flex items-center">
                            <svg class="me-2 h-4 w-4" fill="none" viewBox="0 0 20 15">
                              <rect
                                width="19.1"
                                height="13.5"
                                x=".25"
                                y=".75"
                                fill="#fff"
                                stroke="#F5F5F5"
                                stroke-width=".5"
                                rx="1.75"
                              />
                              <mask
                                id="a"
                                style="mask-type: luminance"
                                width="20"
                                height="15"
                                x="0"
                                y="0"
                                maskUnits="userSpaceOnUse"
                              >
                                <rect
                                  width="19.1"
                                  height="13.5"
                                  x=".25"
                                  y=".75"
                                  fill="#fff"
                                  stroke="#fff"
                                  stroke-width=".5"
                                  rx="1.75"
                                />
                              </mask>
                              <g mask="url(#a)">
                                <path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" />
                                <path
                                  fill="#1035BB"
                                  fill-rule="evenodd"
                                  d="M0 14.5h6.533V.5H0v14z"
                                  clip-rule="evenodd"
                                />
                              </g>
                            </svg>
                            France (+33)
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div class="relative w-full">
                    <input
                      id="phone-input"
                      v-model="phone"
                      type="text"
                      class="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                      pattern="\d{9}"
                      placeholder="123-456-7890"
                      maxlength="9"
                    />
                  </div>
                </div>
              </div>

              <div v-if="!authStore.user" class="w-full">
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="name@flowbite.com"
                />
              </div>
            </div>
            <!-- Logged user saved info -->
            <div v-else-if="authStore.user" class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div
                class="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <div class="text-sm space-y-1">
                  <p class="text-gray-900 dark:text-white whitespace-nowrap">
                    <span class="font-semibold">Прізвище:</span>
                    &nbsp;
                    <span class="text-gray-700 dark:text-gray-300">{{
                      authStore.user.userFamily
                    }}</span>
                  </p>
                  <p class="text-gray-900 dark:text-white whitespace-nowrap">
                    <span class="font-semibold">Ім'я:</span>
                    &nbsp;
                    <span class="text-gray-700 dark:text-gray-300">{{
                      authStore.user.username
                    }}</span>
                  </p>
                  <p class="text-gray-900 dark:text-white whitespace-nowrap">
                    <span class="font-semibold">По батькові:</span>
                    &nbsp;
                    <span class="text-gray-700 dark:text-gray-300">{{
                      authStore.user.userSurname
                    }}</span>
                  </p>
                  <p class="text-gray-900 dark:text-white whitespace-nowrap">
                    <span class="font-semibold">Email:</span>
                    &nbsp;
                    <span class="text-gray-700 dark:text-gray-300">{{ authStore.user.email }}</span>
                  </p>
                  <p class="text-gray-900 dark:text-white whitespace-nowrap">
                    <span class="font-semibold">Телефон:</span>
                    &nbsp;
                    <span class="text-gray-700 dark:text-gray-300"
                      >+380 {{ authStore.user.phoneNumber }}</span
                    >
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="authStore.user"
              class="w-full flex justify-between items-center p-4 rounded-lg bg-gray-50"
            >
              <span class="text-gray-900 dark:text-white"> Вибрати іншого отримувача </span>
              <!-- <ToggleBtn @click="toggleContactInfo" /> -->
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Спосіб доставки</h3>
            <!-- <DeliverySelector v-model="deliveryMethod"/> -->

            <!-- <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label
                class="rounded-lg border p-4 ps-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                :class="{
                  'border-[var(--dark-color)] dark:border-[var(--main-accent)]' : deliveryMethod === 'nova-post',
                  'border-gray-200 dark:border-gray-700':
                    deliveryMethod !== 'nova-post',
                }"
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="nova-post"
                  v-model="deliveryMethod"
                  class="hidden"
                />
                <div class="flex items-center h-full">
                  <div class="text-sm flex flex-col justify-between items-start gap-2 relative h-full">
                    <img src="@/public/img/nova-post.png" alt="new-post" class="dark:bg-white dark:rounded-lg p-2"/>
                    <span class="text-[var(--dark-color)] text-base dark:text-[var(--dark-font-color)]">
                      Оріентована дата доставки: <br />
                      <span class="dark:text-[var(--main-accent)]">
                        {{ day + 1 <= 9 ? "0" + (day + 1) : day + 1 }} -
                        {{ day + 3 <= 9 ? "0" + (day + 3) : day + 3 }} .
                        {{ month + 1 <= 9 ? "0" + (month + 1) : month + 1 }} .
                        {{ year }}
                      </span>
                    </span>
                  </div>
                </div>
              </label>

              <label
                class="rounded-lg border p-4 ps-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                :class="{
                  'border-[var(--dark-color)] dark:border-[var(--main-accent)]': deliveryMethod === 'ukrpost',
                  'border-gray-200 dark:border-gray-700':
                    deliveryMethod !== 'ukrpost',
                }"
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="ukrpost"
                  v-model="deliveryMethod"
                  class="hidden"
                />
                <div class="flex items-center h-full">
                  <div class="text-sm flex flex-col justify-between items-start gap-2 relative h-full">
                    <img src="@/public/img/ukrpost.png" alt="ukrpost" class="dark:bg-white dark:rounded-lg p-2"/>
                    <span class="text-[var(--dark-color)] text-base dark:text-[var(--dark-font-color)]">
                      Оріентована дата доставки: <br />
                      <span class="dark:text-[var(--main-accent)]">

                        {{ day + 3 <= 9 ? "0" + (day + 3) : day + 3 }} -
                        {{ day + 5 <= 9 ? "0" + (day + 5) : day + 5 }} .
                        {{ month + 1 <= 9 ? "0" + (month + 1) : month + 1 }} .
                        {{ year }}
                      </span>

                    </span>
                  </div>
                </div>
              </label>

              <label
                class="rounded-lg border p-4 ps-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                :class="{
                  'border-[var(--dark-color)] dark:border-[var(--main-accent)]': deliveryMethod === 'express',
                  'border-gray-200 dark:border-gray-700':
                    deliveryMethod !== 'express',
                }"
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="express"
                  v-model="deliveryMethod"
                  class="hidden"
                />
                <div class="flex items-start h-full">
                  <div class="text-sm flex flex-col justify-between items-start gap-2 relative h-full">
                    <span
                      class="font-medium text-2xl leading-none text-gray-900 dark:text-white"
                    >
                      Самовивіз (Харків)
                    </span>
                    <div class="info">
                      <p
                        class="mt-1 text-base font-normal text-gray-500 dark:text-gray-400"
                      >
                        Час готовності замовлення
                      </p>
                      <p
                        class="mt-1 text-base font-normal text-gray-500 dark:text-[var(--main-accent)]"
                      >
                        {{ deliveryTime }}:00
                      </p>
                    </div>
                  
                  </div>
                </div>
              </label>
              <label
                class="rounded-lg border p-4 ps-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                :class="{
                  'border-[var(--dark-color)] dark:border-[var(--main-accent)]':
                    deliveryMethod === 'courier-delivery',
                  'border-gray-200 dark:border-gray-700':
                    deliveryMethod !== 'courier-delivery',
                }"
              >
                <input
                  type="radio"
                  name="delivery-method"
                  value="courier-delivery"
                  v-model="deliveryMethod"
                  class="hidden"
                />
                <div class="flex items-start h-full">
                  <div class="text-sm flex flex-col justify-between items-start gap-2 relative h-full">
                    <span
                      class="font-medium text-xl leading-none text-gray-900 dark:text-white"
                    >
                      Кур'єрська доставка по м. Харків.
                    </span>
                    <div class="info">
                      <p
                        class="mt-1 text-base font-normal text-gray-500 dark:text-gray-400"
                      >
                        Час готовності замовлення
                      </p>
                      <p
                        class="mt-1 text-base font-normal text-gray-500 dark:text-[var(--main-accent)]"
                      >
                        {{ deliveryTime }}:00
                      </p>
                    </div>
                  
                  </div>
                </div>
              </label>
            </div> -->
          </div>
          <div
            v-if="!deliveryAddressState && authStore.user && authStore.user.adresses > 0"
            class="space-y-4"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Збережені способи отримання
            </h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div
                class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <div class="flex items-start">
                  <div class="hidden h-5 items-center">
                    <input
                      id="express"
                      aria-describedby="express-text"
                      type="radio"
                      name="delivery-method"
                      value=""
                      class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    />
                  </div>

                  <div class="text-sm">
                    <label
                      for="express"
                      class="font-medium leading-none text-gray-900 dark:text-white"
                    >
                      Самовивіз (Харків)</label
                    >
                    <p
                      id="express-text"
                      class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      Час готовності замовлення
                    </p>
                    <p
                      id="express-text"
                      class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      {{ deliveryTime }}:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex justify-between items-center p-4 rounded-lg bg-gray-50">
              <span class="text-gray-900 dark:text-white"> Додати новий спосіб отримання </span>
              <!-- <ToggleBtn @click="toggleContactInfo" /> -->
            </div>
          </div>

          <!-- NOVA POSTA -->
          <div v-if="!deliveryAddressState && deliveryMethod === 'nova-post'" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Деталі доставки</h2>

            <div class="grid grid-cols-1 gap-4">
              <div class="relative">
                <label
                  for="your_name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ваш населений пункт
                </label>
                <input
                  id="your_name"
                  v-model="cityRef"
                  type="text"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Оберіть населений пункт"
                  @input="getCitiesNp"
                />
                <ul
                  v-if="fetchedCity.length > 0"
                  class="city-list h-fit max-h-60 overflow-y-scroll absolute z-20 rounded-br-lg rounded-bl-lg bg-[var(--bg-color)] w-full"
                >
                  <li
                    v-for="city in fetchedCity"
                    :key="city.id"
                    @click="
                      ((cityRef = city.Present),
                      (cityName = city.MainDescription),
                      (fetchedCity = []))
                    "
                  >
                    <span class="text-[var(--dark-color)] text-sm p-2 cursor-pointer">
                      {{ city.Present }}
                    </span>
                  </li>
                </ul>
                <div
                  v-if="unknownCity"
                  class="city-list h-fit absolute z-20 bg-[var(--bg-color)] rounded-br-lg rounded-bl-lg w-full text-red-500 border-[1px] border-t-0 p-2"
                >
                  Місто не знайдено
                </div>
              </div>
            </div>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Оберіть спосіб отримання:
            </h2>

            <label
              for="postomat"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Поштомат "Нова Пошта"
            </label>
            <label class="flex items-center gap-3 cursor-pointer relative">
              <input
                id="postomat"
                v-model="selectedDelivery"
                type="radio"
                name="deliveryMethod"
                value="postomat"
                class="hidden peer"
                @click="getPostomatsNp(e, 'reload')"
              />
              <ul
                v-if="postomatList.length > 0"
                class="city-list h-fit max-h-60 overflow-y-scroll absolute z-20 rounded-br-lg rounded-bl-lg bg-[var(--bg-color)] w-full top-full r-0"
              >
                <li
                  v-for="(postomat, index) in postomatList"
                  :key="index"
                  @click="
                    ((postomatNumber = `${postomat.Number} ${postomat.ShortAddress}`),
                    (postomatList.length = 0),
                    (preventReloadBox = true))
                  "
                >
                  <span class="text-[var(--dark-color)] text-sm p-2 cursor-pointer">
                    {{ postomat.Number }}
                    {{ postomat.ShortAddress }}
                  </span>
                </li>
              </ul>
              <span
                class="w-6 h-6 rounded-full bg-[#E5EFF5] shadow-[inset_3px_3px_6px_#c1cace,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1C2E40] peer-checked:shadow-[inset_2px_2px_5px_#0f1a26,inset_-2px_-2px_5px_#2C4E72]"
              >
                <span
                  class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-md"
                ></span>
              </span>
              <input
                v-model="postomatNumber"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Введіть номер поштомату або адресу"
                :disabled="selectedDelivery !== 'postomat'"
                @input="getPostomatsNp(e, 'reload')"
              />
            </label>

            <label
              for="branch"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Відділення "Нова Пошта"
            </label>
            <label class="flex items-center gap-3 cursor-pointer relative">
              <input
                id="branch"
                v-model="selectedDelivery"
                type="radio"
                name="deliveryMethod"
                value="branch"
                class="hidden peer"
                @click="getPostOfficeNp(e, 'reload')"
              />
              <span
                class="w-6 h-6 rounded-full bg-[#E5EFF5] shadow-[inset_3px_3px_6px_#c1cace,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1C2E40] peer-checked:shadow-[inset_2px_2px_5px_#0f1a26,inset_-2px_-2px_5px_#2C4E72]"
              >
                <span
                  class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-md"
                ></span>
              </span>
              <input
                v-model="postAddress"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Введіть номер відділення"
                :disabled="selectedDelivery !== 'branch'"
                @input="getPostOfficeNp(e, 'reload')"
              />
              <ul
                v-if="postAddressList.length > 0"
                class="city-list h-fit max-h-60 overflow-y-scroll absolute z-20 rounded-br-lg rounded-bl-lg bg-[var(--bg-color)] w-full top-full r-0"
              >
                <li
                  v-for="(office, index) in postAddressList"
                  :key="index"
                  @click="
                    ((postAddress = `${office.Number} ${office.ShortAddress}`),
                    (postAddressList.length = 0),
                    (preventReloadBox = true))
                  "
                >
                  <span class="text-[var(--dark-color)] text-sm p-2 cursor-pointer">
                    {{ office.Number }}
                    {{ office.ShortAddress }}
                  </span>
                </li>
              </ul>
            </label>

            <label
              for="courier"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Кур'єр "Нова Пошта"
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                id="courier"
                v-model="selectedDelivery"
                type="radio"
                name="deliveryMethod"
                value="courier"
                class="hidden peer"
              />
              <span
                class="w-6 h-6 rounded-full bg-[#E5EFF5] shadow-[inset_3px_3px_6px_#c1cace,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1C2E40] peer-checked:shadow-[inset_2px_2px_5px_#0f1a26,inset_-2px_-2px_5px_#2C4E72]"
              >
                <span
                  class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-md"
                ></span>
              </span>
              <input
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Введіть Вашу адресу"
                :disabled="selectedDelivery !== 'courier'"
              />
            </label>
            <div
              v-if="authStore.user"
              class="w-full flex justify-between items-center p-4 rounded-lg bg-gray-50"
            >
              <span class="text-gray-900 dark:text-white"> Зберегти спосіб отримання </span>
              <!-- <ToggleBtn @click="toggleContactInfo" /> -->
            </div>
          </div>
          <!-- UKRPOSTA -->
          <div v-if="!deliveryAddressState && deliveryMethod === 'ukrpost'" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Деталі доставки</h2>

            <div class="grid grid-cols-1 gap-4">
              <div class="relative">
                <label
                  for="your_name"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ваш населений пункт
                </label>
                <input
                  id="your_name"
                  v-model="cityRef"
                  type="text"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Введіть Ваш населений пункт"
                />
              </div>
            </div>

            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Оберіть спосіб отримання:
            </h2>

            <label
              for="branch"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Відділення "Укрпошта"
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                id="branch"
                v-model="selectedDelivery"
                type="radio"
                name="deliveryMethod"
                value="branch"
                class="hidden peer"
              />
              <span
                class="w-6 h-6 rounded-full bg-[#E5EFF5] shadow-[inset_3px_3px_6px_#c1cace,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1C2E40] peer-checked:shadow-[inset_2px_2px_5px_#0f1a26,inset_-2px_-2px_5px_#2C4E72]"
              >
                <span
                  class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-md"
                ></span>
              </span>
              <input
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Введіть номер відділення Укрпошта"
                :disabled="selectedDelivery !== 'branch'"
              />
            </label>

            <label
              for="courier"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Кур'єр "Укрпошта"
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                id="courier"
                v-model="selectedDelivery"
                type="radio"
                name="deliveryMethod"
                value="courier"
                class="hidden peer"
              />
              <span
                class="w-6 h-6 rounded-full bg-[#E5EFF5] shadow-[inset_3px_3px_6px_#c1cace,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1C2E40] peer-checked:shadow-[inset_2px_2px_5px_#0f1a26,inset_-2px_-2px_5px_#2C4E72]"
              >
                <span
                  class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-md"
                ></span>
              </span>
              <input
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Введіть Вашу адресу"
                :disabled="selectedDelivery !== 'courier'"
              />
            </label>
            <div
              v-if="authStore.user"
              class="w-full flex justify-between items-center p-4 rounded-lg bg-gray-50"
            >
              <span class="text-gray-900 dark:text-white"> Зберегти спосіб отримання </span>
              <!-- <ToggleBtn @click="toggleContactInfo" /> -->
            </div>
          </div>

          <!-- COURIER DELIVERY -->
          <div v-if="courierDeliveryState" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Деталі доставки</h2>
            <label
              for="courier"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Кур'єрська доставка по м. Харків
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                id="courier"
                v-model="selectedDelivery"
                type="radio"
                name="deliveryMethod"
                value="courier"
                class="hidden peer"
              />
              <span
                class="w-6 h-6 rounded-full bg-[#E5EFF5] shadow-[inset_3px_3px_6px_#c1cace,inset_-3px_-3px_6px_#ffffff] flex items-center justify-center transition-all duration-300 peer-checked:bg-[#1C2E40] peer-checked:shadow-[inset_2px_2px_5px_#0f1a26,inset_-2px_-2px_5px_#2C4E72]"
              >
                <span
                  class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity shadow-md"
                ></span>
              </span>
              <input
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Введіть Вашу адресу (м. Харків)"
                :disabled="selectedDelivery !== 'courier'"
              />
            </label>
          </div>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Спосіб оплати</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label class="block cursor-pointer">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  name="payment-method"
                  class="peer hidden"
                  value="cash-on-delivery"
                  checked
                />
                <div
                  class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 peer-checked:border-[var(--dark-color)] peer-checked:dark:border-[var(--main-accent)] peer-checked:dark:bg-[var(--dark-color)]"
                >
                  <div class="text-sm">
                    <span class="font-medium leading-none text-gray-900 dark:text-white">
                      Оплата при отриманні
                    </span>
                    <p class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                      Оплата при отриманні товару
                    </p>
                  </div>
                </div>
              </label>

              <label class="block cursor-pointer">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  name="payment-method"
                  value="banc-account"
                  class="peer hidden"
                />
                <div
                  class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 peer-checked:border-[var(--dark-color)] peer-checked:dark:border-[var(--main-accent)] peer-checked:dark:bg-[var(--dark-color)]"
                >
                  <div class="text-sm">
                    <span class="font-medium leading-none text-gray-900 dark:text-white">
                      Оплата на рахунок
                    </span>
                    <p class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                      Оплата на рахунок після перевірки
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div
          class="mt-6 space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md sticky top-20 bg-gray-50 dark:bg-[var(--dark-accent-color)] dark:border dark:border-solid dark:border-[var(--main-accent)] p-4 rounded-lg"
        >
          <div class="flow-root">
            <div class="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
              <dl class="flex justify-between items-center my-5">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Ваше замовлення:
                </h2>

                <NuxtLink
                  to="/cart"
                  class="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Змінити
                </NuxtLink>
              </dl>
              <dl class="products-slide">
                <Swiper
                  :slides-per-view="3"
                  :space-between="0"
                  :pagination="{
                    clickable: true
                  }"
                  :autoplay="{
                    delay: 3500,
                    disableOnInteraction: false
                  }"
                  class="mySwiper"
                >
                  <SwiperSlide
                    v-for="product in cartStore.cart"
                    :key="product.id"
                    class="flex flex-col items-center justify-center gap-1 p-0"
                  >
                    <img
                      :src="product.img[0].path"
                      alt="product"
                      class="w-20 h-20 object-contain"
                    />
                    <span
                      class="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {{ product.totalPrice }}
                      грн.
                    </span>
                  </SwiperSlide>
                </Swiper>
              </dl>
              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Вартість товарів
                </dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">
                  {{ checkout.totalProducts }} грн.
                </dd>
              </dl>

              <dl
                v-if="checkout.totalPrice < 2000"
                class="flex items-center justify-between gap-4 py-3"
              >
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                  Вартість доставки
                </dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">200 грн.</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Знижка</dt>
                <dd class="text-base font-medium text-green-500">-0 грн.</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Всього:</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">
                  <!-- {{ cartStore.totalPrice > 2000 ? cartStore.totalPrice : cartStore.totalPrice + 200 }} грн. -->
                  {{ checkout.totalPrice }} грн.
                </dd>
              </dl>
            </div>
          </div>

          <div class="space-y-3">
            <button
              type="button"
              class="flex w-full items-center gap-2 justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 bg-[var(--dark-color)] focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="processCheckout"
            >
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              <span> Оформити замовлення </span>
            </button>

            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Безкоштовна доставка для товарів на сумму вищще 2000 грн.
            </p>
          </div>
        </div>
      </div>
    </form>
    <!-- <Tooltips v-if="showTooltip" :tooltipStatus="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips> -->
  </section>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
// import { useCartStore, useAuthStore } from "#imports";
import { Swiper, SwiperSlide } from "swiper/vue";

import { navigateTo } from "nuxt/app";
// import ToggleBtn from "@/components/shared/ToggleBtn.vue";
// import Tooltips from "@/components/shared/Tooltips.vue";
// import DeliverySelector from "~/components/DeliverySelector.vue";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";

const cityRef = ref("");
const cityName = ref("");
const fetchedCity = ref([]);
const unknownCity = ref(false);

const name = ref("");
const surname = ref("");
const familyName = ref("");
const phone = ref("");
const email = ref("");
const deliveryMethod = ref("nova-post");
const selectedDelivery = ref("");
const paymentMethod = ref("");

const contactInfoState = ref(false);
const deliveryAddressState = ref(false);
const courierDeliveryState = ref(false);
// const saveDeliveryAddress = ref(false);

// const checkoutProducts = ref([]);

const checkout = ref({
  totalProducts: 0,
  discount: 0,
  totalPrice: 0
});

let timerId = null;

const date = new Date();
// const day = date.getDate();
// const month = date.getMonth();
// const year = date.getFullYear();
const hours = date.getHours();
const openHour = 9;
const closeHour = 18;

const postomatNumber = ref("");
const postAddress = ref("");
const currierAddress = ref("");
const postomatList = ref([]);
const postAddressList = ref([]);
const preventReloadBox = ref(false);

const cartStore = useCartStore();
const authStore = useAuthStore();

const getFormattedHours = (h) => (h < 10 ? "0" + h : h);
// const getFormattedMonth = (m) => (m < 10 ? "0" + m : m);

const config = useRuntimeConfig();
const NOVA_POST_KEY = config.public.novaPostKey;
const NOVA_POST_URI = config.public.novaPostUri;

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

// const numReg = /^[0-9]+$/;

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  // setTimeout(() => {
  //   showTooltip.value = false;
  //   tooltipStatus.value = "";
  //   tooltipMessage.value = "";
  // }, 3000);
};

const clearForm = () => {
  name.value = "";
  surname.value = "";
  familyName.value = "";
  phone.value = "";
  email.value = "";
  postAddress.value = "";
  postomatNumber.value = "";
  currierAddress.value = "";
  postomatList.value = [];
  postAddressList.value = [];
  cityName.value = "";
  cityRef.value = "";
};

onMounted(() => {
  if (authStore.user) {
    name.value = authStore.user.username;
    surname.value = authStore.user.userSurname;
    familyName.value = authStore.user.userFamily;
    phone.value = authStore.user.phoneNumber;
    email.value = authStore.user.email;
    contactInfoState.value = false;
  } else {
    contactInfoState.value = true;
  }
  checkout.value.totalProducts = cartStore.totalPrice;
  checkout.value.totalPrice =
    cartStore.totalPrice > 2000 ? cartStore.totalPrice : cartStore.totalPrice + 200;
});

const deliveryTime = computed(() => {
  const pickupTime = hours + 2;

  if (pickupTime >= openHour && pickupTime < closeHour) {
    return `Сьогодні з ${getFormattedHours(pickupTime)}`;
  } else {
    return `Завтра з ${getFormattedHours(openHour)}`;
  }
});

// const toggleContactInfo = () => {
//   contactInfoState.value = !contactInfoState.value;
//   if (!contactInfoState.value) {
//     console.log(1);
//     name.value = authStore.user.username;
//     surname.value = authStore.user.userSurname;
//     familyName.value = authStore.user.userFamily;
//     phone.value = authStore.user.phoneNumber;
//   } else {
//     console.log(2);
//     name.value = "";
//     surname.value = "";
//     familyName.value = "";
//     phone.value = "";
//   }
// };

watch(deliveryMethod, () => {
  if (deliveryMethod.value === "courier-delivery" || deliveryMethod.value === "express") {
    deliveryAddressState.value = true;
  } else {
    deliveryAddressState.value = false;
  }

  deliveryMethod.value === "courier-delivery"
    ? (courierDeliveryState.value = true)
    : (courierDeliveryState.value = false);
});

const processCheckout = async () => {
  if (cartStore.totalPrice === 0) {
    tooltip({
      status: "error",
      message: "Ваш кошик порожній"
    });
    return;
  }

  if (!authStore.user || contactInfoState.value) {
    if (!name.value || !surname.value || !familyName.value || !email.value || !phone.value) {
      tooltip({
        status: "error",
        message: "Всі поля повинні бути заповнені"
      });
      return;
    }

    if (!authStore.user) {
      if (!email.value.includes("@")) {
        tooltip({
          status: "error",
          message: "Введіть коректну електронну адресу"
        });
        return;
      }

      const phoneRegex = /^\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$/;

      if (!phoneRegex.test(phone.value)) {
        tooltip({
          status: "error",
          message: "Введіть коректний номер телефону"
        });
        return;
      }
    }
  }

  // delivery validation

  if (deliveryMethod.value === "nova-post") {
    if (cityName.value.trim().length === 0) {
      tooltip({
        status: "info",
        message: "Введіть місто"
      });
      return;
    }

    if (
      postAddress.value.trim().length === 0 &&
      postomatNumber.value.trim().length === 0 &&
      currierAddress.value.trim().length === 0
    ) {
      tooltip({
        status: "info",
        message: "Оберіть метод та введіть адресу доставки"
      });
      return;
    }

    // if (
    //   postAddress.value.trim().length === 0 ||
    //   (postomatNumber.value.trim().length === 0 && currierAddress.value.trim().length === 0)
    // ) {
    //   tooltip({
    //     status: "info",
    //     message: "Оберіть метод та введіть адресу доставки",
    //   });
    //   return;
    // }
  } else if (deliveryMethod.value === "ukrpost") {
    console.log("ukrpost");
  } else if (deliveryMethod.value === "courier-delivery") {
    console.log("courier-delivery");
  }

  try {
    const cartData = cartStore.cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantityProducts
      };
    });

    const orderData = new FormData();

    const orderBody = {
      email: email.value,
      orders: [
        {
          totalPrice: cartStore.totalPrice,
          paymentMethod: paymentMethod.value,
          shippingInfo: {
            recipient: name.value + " " + surname.value + " " + familyName.value,
            postCompany: deliveryMethod.value,
            phoneNumber: phone.value,
            postOffice: postAddress.value,
            postomat: postomatNumber.value,
            address: currierAddress.value,
            city: cityName.value,
            country: "Ukraine"
          },
          orderItems: [...cartData]
        }
      ]
    };

    orderData.append("data", JSON.stringify(orderBody));

    const createNewOrder = await $fetch("api/orders", {
      method: "POST",
      body: orderData
    });

    console.log(createNewOrder, "createNewOrder");
    if (createNewOrder.status === "error") {
      console.log(createNewOrder.message);
      return;
    }

    tooltip({
      status: "success",
      message: "Ваше замовлення було успішно створено"
    });

    const tgMessageBody = {
      orderId: createNewOrder.data,
      user: name.value + " " + surname.value + " " + familyName.value,
      paymentMethod: paymentMethod.value,
      amount: cartStore.totalPrice,
      phone: phone.value,
      email: email.value,
      date: new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })
    };

    const tgData = new FormData();

    tgData.append("data", JSON.stringify(tgMessageBody));

    const notificationTg = await $fetch("/api/telegram?notification=newOrder", {
      method: "POST",
      body: tgData
    });

    console.log(notificationTg, "notificationTg");

    clearForm();
    setTimeout(() => {
      navigateTo("/");
    }, 3000);

    cartStore.clearCart();
  } catch (err) {
    console.log(err);
  }
};

const debounce = (string, fn) => {
  return () => {
    clearTimeout(timerId);
    if (string === "") {
      console.log("string is empty");
      return fn();
    }
    timerId = setTimeout(() => {
      console.log("log debounce");
      fn();
    }, 500);
  };
};

class PostalServiceApi {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return await res.json();
    } catch (err) {
      console.log("Something went wrong", err);
      return null;
    }
  }

  async fetchCity(cityName, modelName, calledMethod) {
    const body = {
      apiKey: this.apiKey,
      modelName,
      calledMethod,
      methodProperties: {
        CityName: cityName,
        Limit: "500",
        Page: "1"
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }

  async fetchWarehouses(cityName, modelName, calledMethod, extraParams = {}) {
    const body = {
      apiKey: this.apiKey,
      modelName,
      calledMethod,
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        CategoryOfWarehouse: "Postomat",
        Page: "1",
        ...extraParams
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }
}

class NovaPoshtaApi extends PostalServiceApi {
  constructor() {
    super(NOVA_POST_URI, NOVA_POST_KEY);
  }

  fetchCity(cityName) {
    return super.fetchCity(cityName, "AddressGeneral", "searchSettlements");
  }

  async fetchPostomats(cityName) {
    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        CategoryOfWarehouse: "Postomat",
        Page: "1"
      }
    };

    return super.request("", {
      method: "POST",
      body
    });
  }

  async fetchOfficeByNumber(cityName, number) {
    console.log(cityName, number);
    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        FindByString: number,
        Page: "1"
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }

  async fetchPostAddresses(cityName) {
    // "CategoryOfWarehouse" : "Branch",

    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "3000",
        Page: "1"
      }
    };

    return super.request("", {
      method: "POST",
      body
    });
  }

  async fetchPostomatsByNumber(cityName, number) {
    console.log(cityName, number);
    const body = {
      apiKey: this.apiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: cityName,
        Limit: "1000",
        CategoryOfWarehouse: "Postomat",
        FindByString: number,
        Page: "1"
      }
    };

    return this.request("", {
      method: "POST",
      body
    });
  }
}

// refresh input fields

watch(selectedDelivery, () => {
  console.log(selectedDelivery.value, "selectedDelivery");
  if (selectedDelivery.value === "branch") {
    postomatNumber.value = "";
    currierAddress.value = "";
    postomatList.value = [];
    preventReloadBox.value = false;
  } else if (selectedDelivery.value === "postomat") {
    currierAddress.value = "";
    postAddress.value = "";
    postAddressList.value = [];
    preventReloadBox.value = false;
  } else if (selectedDelivery.value === "courier") {
    postomatNumber.value = "";
    postAddress.value = "";
    postAddressList.value = [];
    postomatList.value = [];
    preventReloadBox.value = false;
  }
});

const novaPost = new NovaPoshtaApi();

const getCitiesNp = debounce(cityRef.value, async () => {
  const npCities = await novaPost.fetchCity(cityRef.value);
  if (npCities.data[0] === undefined) {
    unknownCity.value = true;
  } else {
    unknownCity.value = false;
    fetchedCity.value = npCities.data[0].Addresses;
  }
});

const getPostomatsNp = async (event, state) => {
  if (state === "reload") {
    const getPostomatsByNumber = await novaPost.fetchPostomatsByNumber(
      cityName.value,
      postomatNumber.value
    );
    console.log(getPostomatsByNumber, "getPostomatsByNumber");
    postomatList.value = getPostomatsByNumber.data;
    return;
  }

  if (preventReloadBox.value) {
    return;
  }

  if (!cityName.value) {
    tooltip({
      status: "info",
      message: "Виберіть місто"
    });
    event.preventDefault();

    return;
  }

  const postomatsNp = await novaPost.fetchPostomats(cityName.value);
  postomatList.value = postomatsNp.data;
};

const getPostOfficeNp = async (event, state) => {
  if (state === "reload") {
    const getOfficeByNumber = await novaPost.fetchOfficeByNumber(cityName.value, postAddress.value);
    console.log(getOfficeByNumber, "getPostomatsByNumber");
    const filteredOffice = getOfficeByNumber.data.filter(
      (item) => item.CategoryOfWarehouse === "Branch"
    );

    postAddressList.value = filteredOffice;
    return;
  }

  if (preventReloadBox.value) {
    return;
  }

  if (!cityName.value) {
    tooltip({
      status: "info",
      message: "Виберіть місто"
    });
    event.preventDefault();

    return;
  }

  const postOfficeNp = await novaPost.fetchPostAddresses(cityName.value);
  // console.log(postOfficeNp, 'postOfficeNp');
  const filteredOffice = postOfficeNp.data.filter((item) => item.CategoryOfWarehouse === "Branch");
  postAddressList.value = filteredOffice;
};

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" }]
});
</script>

<style scoped lang="scss">
.swiper-slide {
  display: flex;
  padding: 0 0 15px;
}
</style>
