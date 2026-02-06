<template>
  <div class="admin_page">
    <nav class="admin_page_nav" navbar-main navbar-scroll="false">
      <div class="nav_content">
        <nav class="breadcrumb">
          <!-- breadcrumb -->
          <ol>
            <li>
              <a href="javascript:;">Pages</a>
            </li>
            <li class="li_divider" aria-current="page">Dashboard</li>
          </ol>
          <h6>Dashboard</h6>
        </nav>
        <!-- RIGHT SIDE ITEMS -->
        <div class="flex items-end mt-2 sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full gap-2"></ul>
        </div>
      </div>
    </nav>

    <!-- cards -->
    <div class="admin_page_content">
      <!-- row 1 -->
      <div class="main_row">
        <!-- card1 -->
        <div v-for="(item, i) in mainMetrics" :key="i" class="main_row_item">
          <div class="item_content">
            <div class="item_content_wrapper">
              <div class="item_card_wrapper">
                <div class="item_info">
                  <div>
                    <p class="item_info_metric">{{ item.metric }}</p>
                    <h5 class="item_info_value">0 грн</h5>
                    <p class="item_info_description">
                      <span
                        class="item_info_description_accent"
                        :style="{ color: item.mathOperator === '+' ? '#10b981' : '#dc2626' }"
                      >
                        +0%
                      </span>
                      {{ item.period }}
                    </p>
                  </div>
                </div>
                <div class="px-3 text-right basis-1/3">
                  <div
                    class="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500"
                  >
                    <i
                      class="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- card2 -->
        <!-- <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-gray-950 dark:border dark:border-solid dark:border-[var(--dark-border-color)] dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div class="flex-auto p-4">
                <div class="flex flex-row -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Користувачі</p>
                      <h5 class="mb-2 font-bold dark:text-white">0</h5>
                      <p class="mb-0 dark:text-white dark:opacity-60">
                        <span class="text-sm font-bold leading-normal text-emerald-500">+3%</span>
                        since last week
                      </p>
                    </div>
                  </div>
                  <div class="px-3 text-right basis-1/3">
                    <div class="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-red-600 to-orange-600">
                      <i class="ni leading-none ni-world text-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        <!-- card3 -->
        <!-- <div class="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-gray-950 dark:border dark:border-solid dark:border-[var(--dark-border-color)] dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div class="flex-auto p-4">
                <div class="flex flex-row -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Всі клієнти</p>
                      <h5 class="mb-2 font-bold dark:text-white">0</h5>
                      <p class="mb-0 dark:text-white dark:opacity-60">
                        <span class="text-sm font-bold leading-normal text-red-600">-0%</span>
                        за останній місяць
                      </p>
                    </div>
                  </div>
                  <div class="px-3 text-right basis-1/3">
                    <div class="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-emerald-500 to-teal-400">
                      <i class="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        <!-- card4 -->
        <!-- <div class="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div class="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-gray-950 dark:border dark:border-solid dark:border-[var(--dark-border-color)] dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div class="flex-auto p-4">
                <div class="flex flex-row -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p class="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Продажі</p>
                      <h5 class="mb-2 font-bold dark:text-white">0 грн.</h5>
                      <p class="mb-0 dark:text-white dark:opacity-60">
                        <span class="text-sm font-bold leading-normal text-emerald-500">+0%</span>
                        за останній місяць
                      </p>
                    </div>
                  </div>
                  <div class="px-3 text-right basis-1/3">
                    <div class="inline-block w-12 h-12 text-center rounded-full bg-gradient-to-tl from-orange-500 to-yellow-500">
                      <i class="ni leading-none ni-cart text-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
      </div>

      <!-- cards row 2 -->
      <div class="flex flex-wrap mt-6 -mx-3">
        <!-- <SalesChart /> -->

        <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
          <div slider class="relative w-full h-full overflow-hidden rounded-2xl">
            <!-- slide 1 -->

            <!-- slide 2 -->

            <!-- slide 3 -->

            <!-- Control buttons -->
            <!-- <button
              btn-next
              class="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-right active:scale-110 top-6 right-4"
            ></button>
            <button
              btn-prev
              class="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-left active:scale-110 top-6 right-16"
            ></button> -->
          </div>
        </div>
      </div>

      <!-- cards row 3 -->

      <!-- <div class="flex flex-wrap mt-6 -mx-3">
        <div class="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:border dark:border-[var(--dark-border-color)] border-solid shadow-xl dark:shadow-dark-xl dark:bg-gray-950 border-black-125 rounded-2xl bg-clip-border"
          >
            <div class="p-4 pb-0 mb-0 rounded-t-4">
              <div class="flex justify-between">
                <h6 class="mb-2 dark:text-white">Останні замовлення</h6>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table
                class="items-center w-full mb-4 align-top border-collapse border-gray-200 dark:border-white/40"
              >
                <tbody>
                  <tr>
                    <td
                      class="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex items-center px-2 py-1">
                        <div>
                          <img src="./assets/img/icons/flags/US.png" alt="Country flag" />
                        </div>
                        <div class="ml-6">
                          <p
                            class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                          >
                            Замовник:
                          </p>
                          <h6 class="mb-0 text-sm leading-normal dark:text-white">
                            Василь Васильович
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Сумма:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">0 грн</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Місто одержувача:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Київ</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Поштова служба:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Пошта України</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Статус:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Новий</h6>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex items-center px-2 py-1">
                        <div>
                          <img src="./assets/img/icons/flags/US.png" alt="Country flag" />
                        </div>
                        <div class="ml-6">
                          <p
                            class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                          >
                            Замовник:
                          </p>
                          <h6 class="mb-0 text-sm leading-normal dark:text-white">
                            Василь Васильович
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Сумма:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">0 грн</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Місто одержувача:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Київ</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Поштова служба:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Пошта України</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Статус:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Новий</h6>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex items-center px-2 py-1">
                        <div>
                          <img src="./assets/img/icons/flags/US.png" alt="Country flag" />
                        </div>
                        <div class="ml-6">
                          <p
                            class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                          >
                            Замовник:
                          </p>
                          <h6 class="mb-0 text-sm leading-normal dark:text-white">
                            Василь Васильович
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Сумма:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">0 грн</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Місто одержувача:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Київ</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Поштова служба:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Пошта України</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Статус:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Новий</h6>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex items-center px-2 py-1">
                        <div>
                          <img src="./assets/img/icons/flags/US.png" alt="Country flag" />
                        </div>
                        <div class="ml-6">
                          <p
                            class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                          >
                            Замовник:
                          </p>
                          <h6 class="mb-0 text-sm leading-normal dark:text-white">
                            Василь Васильович
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Сумма:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">0 грн</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Місто одержувача:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Київ</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Поштова служба:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Пошта України</h6>
                      </div>
                    </td>
                    <td
                      class="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                    >
                      <div class="flex-1 text-center">
                        <p
                          class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60"
                        >
                          Статус:
                        </p>
                        <h6 class="mb-0 text-sm leading-normal dark:text-white">Новий</h6>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
          <div
            class="border-black/12.5 shadow-xl dark:bg-gray-950 dark:border-[var(--dark-border-color)] dark:shadow-dark-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border"
          >
            <div class="p-4 pb-0 rounded-t-4">
              <h6 class="mb-0 dark:text-white">Категорії товарів</h6>
            </div>
            <div class="flex-auto p-4">
              <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                <li
                  class="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit"
                >
                  <div class="flex items-center">
                    <div
                      class="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl"
                    >
                      <i class="text-white ni ni-mobile-button relative top-0.75 text-xxs"></i>
                    </div>
                    <div class="flex flex-col">
                      <h6 class="mb-1 text-sm leading-normal text-slate-700 dark:text-white">
                        Devices
                      </h6>
                      <span class="text-xs leading-tight dark:text-white/80"
                        >250 in stock, <span class="font-semibold">346+ sold</span></span
                      >
                    </div>
                  </div>
                  <div class="flex">
                    <button
                      class="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"
                    >
                      <i
                        class="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </li>
                <li
                  class="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-xl text-inherit"
                >
                  <div class="flex items-center">
                    <div
                      class="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl"
                    >
                      <i class="text-white ni ni-tag relative top-0.75 text-xxs"></i>
                    </div>
                    <div class="flex flex-col">
                      <h6 class="mb-1 text-sm leading-normal text-slate-700 dark:text-white">
                        Tickets
                      </h6>
                      <span class="text-xs leading-tight dark:text-white/80"
                        >123 closed, <span class="font-semibold">15 open</span></span
                      >
                    </div>
                  </div>
                  <div class="flex">
                    <button
                      class="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"
                    >
                      <i
                        class="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </li>
                <li
                  class="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-b-lg rounded-xl text-inherit"
                >
                  <div class="flex items-center">
                    <div
                      class="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl"
                    >
                      <i class="text-white ni ni-box-2 relative top-0.75 text-xxs"></i>
                    </div>
                    <div class="flex flex-col">
                      <h6 class="mb-1 text-sm leading-normal text-slate-700 dark:text-white">
                        Error logs
                      </h6>
                      <span class="text-xs leading-tight dark:text-white/80"
                        >1 is active, <span class="font-semibold">40 closed</span></span
                      >
                    </div>
                  </div>
                  <div class="flex">
                    <button
                      class="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"
                    >
                      <i
                        class="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </li>
                <li
                  class="relative flex justify-between py-2 pr-4 border-0 rounded-b-lg rounded-xl text-inherit"
                >
                  <div class="flex items-center">
                    <div
                      class="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl"
                    >
                      <i class="text-white ni ni-satisfied relative top-0.75 text-xxs"></i>
                    </div>
                    <div class="flex flex-col">
                      <h6 class="mb-1 text-sm leading-normal text-slate-700 dark:text-white">
                        Happy users
                      </h6>
                      <span class="text-xs leading-tight dark:text-white/80"
                        ><span class="font-semibold">+ 430 </span></span
                      >
                    </div>
                  </div>
                  <div class="flex">
                    <button
                      class="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all dark:text-white"
                    >
                      <i
                        class="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->

      <!-- cards row 4 -->

      <!-- <div class="flex flex-wrap mt-6 -mx-3">
        <div class="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
          <div
            class="border-black/12.5 shadow-xl dark:bg-gray-950 dark:border-[var(--dark-border-color)] dark:shadow-dark-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border"
          >
            <div class="p-4 pb-0 rounded-t-4">
              <h6 class="mb-0 dark:text-white">Рейтинг товарів</h6>
            </div>
            <div class="flex-auto p-4">
              <ProductPieChart/>
            </div>
          </div>
        </div>
        <div class="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:border dark:border-[var(--dark-border-color)] border-solid shadow-xl dark:shadow-dark-xl dark:bg-gray-950 border-black-125 rounded-2xl bg-clip-border"
          >
            <div class="p-4 pb-0 mb-0 rounded-t-4">
              <div class="flex justify-between">
                <h6 class="mb-2 dark:text-white">Активність на сайті</h6>
              </div>
            </div>
            <div class="overflow-x-auto px-4 py-6">
              <ActiveUsersChart/>
            </div>
          </div>
        </div>
      </div> -->

      <!-- <footer class="pt-4">
        <div class="w-full px-6 mx-auto">
          <div class="flex flex-wrap items-center -mx-3 lg:justify-between"></div>
        </div>
      </footer> -->
    </div>
    <!-- end cards -->
  </div>
</template>

<script setup>
import { ref } from "vue";
// import DashBurger from '@/components/shared/DashBurger.vue';
// import SalesChart from '@/components/SalesChart.vue';
// import ProductPieChart from '@/components/charts/ProductPieChart.vue';
// import ActiveUsersChart from '@/components/charts/ActiveUsersChart.vue';

const mainMetrics = ref([
  {
    metric: "Весь заробіток",
    period: "За останній місяць",
    value: 0,
    percentage: 0,
    mathOperator: "-",
    icon: "",
    gradientColor: "#3b82f6, #8b5cf6"
  },
  {
    metric: "Користувачі",
    period: "За останній тиждень",
    value: 0,
    percentage: 0,
    mathOperator: "+",
    icon: "",
    gradientColor: "#dc2626, #f97316"
  },
  {
    metric: "Всі клієнти",
    period: "За останній місяць",
    value: 0,
    percentage: 0,
    mathOperator: "+",
    icon: "",
    gradientColor: "#10b981, #2dd4bf"
  },
  {
    metric: "Продажі",
    period: "За останній місяць",
    value: 0,
    percentage: 0,
    mathOperator: "-",
    icon: "",
    gradientColor: "#f97316, #facc15"
  }
]);

// const burgerActive = ref(false);

// const handleSidebarToggle = (state) => {
//   burgerActive.value = state;
// };

definePageMeta({
  layout: "admin"
});
</script>

<style lang="scss">
.admin_page {
  &_nav {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    transition-property: all;
    transition-timing-function: ease-in;
    transition-duration: 250ms;
    box-shadow: none;
    border-radius: 1rem;

    @media (min-width: 1024px) {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }

    .nav_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      margin-left: auto;
      margin-right: auto;
      flex-wrap: inherit;
    }
    .breadcrumb {
      ol {
        display: flex;
        flex-wrap: wrap;
        padding-top: 0.25rem;
        margin-right: 3rem;
        background-color: transparent;
        border-radius: 0.5rem;

        @media (min-width: 640px) {
          margin-right: 4rem;
        }
      }
      li {
        font-size: 0.875rem;
        line-height: 1.5;
      }
      .li_divider {
        font-size: 0.875rem;
        padding-left: 0.5rem;
        text-transform: capitalize;
        line-height: 1.5;
        color: #fff;

        &::before {
          float: left;
          padding-right: 0.5rem;
          color: #fff;
          content: "/";
        }
      }
      a {
        color: #fff;
        opacity: 0.5;
      }
      h6 {
        margin-bottom: 0;
        font-weight: 700;
        color: #fff;
        text-transform: capitalize;
      }
    }
  }

  &_content {
    width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    margin-left: auto;
    margin-right: auto;

    .main_row {
      display: flex;
      flex-wrap: wrap;
      margin-left: -0.75rem;
      margin-right: -0.75rem;
      align-items: stretch;
      position: relative;

      &_item {
        width: 100%;
        max-width: 100%;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        margin-bottom: 1.5rem;
        height: -webkit-fill-available;
        position: relative;

        @media (min-width: 640px) {
          width: 50%;
          flex: none;
        }

        @media (min-width: 1280px) {
          margin-bottom: 0;
          width: 25%;
        }
      }
      .item_content {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-break: break-word;
        background-color: rgba(13, 12, 13, 0.75);
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 1rem;
        background-clip: border-box;
        height: 100%;

        &.dark {
          background-color: #111827;
          border: 1px solid var(--dark-border-color);
          box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.2),
            0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }
        &_wrapper {
          flex: 1 1 auto;
          padding: 1rem;
        }
        .item_card_wrapper {
          display: flex;
          flex-direction: row;
          margin-left: -0.75rem;
          margin-right: -0.75rem;
        }
        .item_info {
          flex: none;
          width: 66.666667%;
          max-width: 100%;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          &_metric {
            margin-bottom: 0;
            font-family: sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            line-height: 1.5;
            text-transform: uppercase;

            &.dark {
              color: #fff;
              opacity: 0.6;
            }
            &_value {
              margin-bottom: 0.5rem;
              font-weight: 700;

              &.dark {
                color: #fff;
              }
            }

            &_description {
              margin-bottom: 0;

              &.dark {
                color: #fff;
                opacity: 0.6;
              }

              &_accent {
                font-size: 0.875rem;
                font-weight: 700;
                line-height: 1.5;
                color: #10b981;
              }
            }
          }
        }
      }
    }
  }
}
</style>
