<template>


<section class="faq">

    <div class="container">

        <h1 class="faq_title">
            FAQ
        </h1>

        <div class="faq_wrapper">


            <div class="faq_content">

                <div class="content_section">

                    <h2 class="section_title">
                        Як відбувається доставка
                    </h2>

                    <ul>
                        <li>
                            <strong>
                                Куди доставляємо?
                            </strong>
                            <span>
                                По всій Україні Новою Поштою.
                            </span>
                        </li>
                        <li>
                            <strong>
                                Час доставки:
                            </strong>
                            <span>
                                –3 робочі дні.
                            </span>
                        </li>
                        <li>
                            <strong>
                                Чи можлива анонімна доставка?
                            </strong>
                            <span>
                                Так, упаковка непрозора
                            </span>
                        </li>
                        <li>
                            <strong>
                                Вартість:
                            </strong>
                            <span>
                                За тарифами Нової Пошти.
                            </span>
                        </li>
                    </ul>

                </div>
                <div class="divider"></div>
                <div class="content_section">

                    <h2 class="section_title">
                        Оплата
                    </h2>

                    <ul class="marked_list">
                        <li>
                            <span>
                                Онлайн оплата (Visa / Mastercard / Apple Pay / Google Pay)
                            </span>
                        </li>
                        <li>
                            <span>
                                Післяплата
                            </span>
                        </li>
                    </ul>

                </div>
                <div class="divider"></div>
                <div class="content_section">

                    <h2 class="section_title">
                        Чи можна повернути замовлення?
                    </h2>

                    <ul class="marked_list">
                        <li>
                            <p>
                                Згідно з Постановою КМУ №172 від 19.03.1994, 
                                інтимні вироби не підлягають поверненню чи обміну 
                                з міркувань гігієни.
                            </p>
                        </li>
                        <li>
                            <p>
                                Поверненню підлягають лише неякісні або несправні товари.
                            </p>
                        </li>
                    </ul>

                </div>
                <div class="divider"></div>
                <div class="content_section">

                    <h2 class="section_title">
                        Чи є гарантія?
                    </h2>

                    <ul class="marked_list">
                        <li>
                            <span>
                                Ми надаємо гарантію.
                            </span>
                        </li>
                        <li>
                            <span>
                                Якщо ви отримали товар із дефектом, 
                                зверніться до нас протягом 48 годин, надавши:
                            </span>

                            <ul class="marked_list">

                                <li>
                                    <span>
                                        номер замовлення та ПІБ
                                    </span>
                                    <span>
                                        фото або відео дефекту
                                    </span>
                                    <span>
                                        опис проблеми.
                                    </span>
                                </li>

                            </ul>

                            <span>
                                Ми обміняємо товар на новий або повернемо кошти.
                            </span>

                        </li>
                    </ul>

                </div>

            </div>

            <div class="faq_content">
                <div class="content_section">

                    <h2 class="section_title">
                        Які використовуються матеріали?
                    </h2>

                    <p>
                        Ми продаємо виключно товари з безпечних матеріалів: 
                        медичний силікон, ABS-пластик, алюміній тощо
                    </p>

                </div>
                <div class="divider"></div>
                 <div class="content_section">

                    <h2 class="section_title">
                        Як правильно доглядати за інтимною продукцією?
                    </h2>

                    <ul class="marked_list">
                        <li>
                            <span>
                                Мийте девайс до та після використання теплою водою та спеціальним засобом.
                            </span>
                        </li>
                        <li>
                            <span>
                                Не використовуйте спирт або агресивні миючі засоби.
                            </span>
                        </li>
                        <li>
                            <span>
                                Зберігайте в сухому місці, окремо від інших девайсів.
                            </span>
                        </li>
                        
                    </ul>

                </div>
                <div class="divider"></div>
                 <div class="content_section">

                    <h2 class="section_title">
                        Який лубрикант підійде?
                    </h2>

                    <ul class="marked_list">
                        <li>
                            <span>
                                Для силіконових іграшок підходить тільки водна основа.
                            </span>
                        </li>
                        <li>
                            <span>
                                Для скляних та металевих девайсів підійдуть будь-які.
                            </span>
                        </li>
                        
                    </ul>

                </div>
                <NuxtImg
                    class="sectionImg"
                    src="./images/index-img/banner.webp"
                    alt="preview"
                    lazy
                />

            </div>


            



        </div>




    </div>


</section>



</template>




<script setup>


</script>




<style lang="scss">

    @use "@/style/mixins.scss" as mixins;


    .faq{
        width: 100%;
        height: 100%;
        position: relative;
        color: var(--text-color);
        @include mixins.pageSpacing;

        .faq_title{
            @include mixins.titleText;
            margin-bottom: 40px;
        }

        .faq_wrapper{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: auto;
            gap: 5vw;

            @media screen and (max-width: 768px) {
                flex-direction: column;
                gap: 28px;
            }
        }

        .faq_content{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px;
            flex: 1;

            @media screen and (max-width: 1024px) {
                gap: 14px;
            }

            @media screen and (max-width: 480px) {
                gap: 12px;
            }
        }

        .content_section{


            ul{
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                gap: 20px;

                @media screen and (max-width: 1024px) {
                    gap: 16px;

                }

                @media screen and (max-width: 480px) {
                    gap: 8px;
                }
            }

            li{
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: start;
                gap: 12px;
            }

            strong{
                color: var(--text-color, #FFF);
                font-family: 'Montserrat', sans-serif;
                font-size: 1.125rem;
                font-style: normal;
                font-weight: 600;
                line-height: 150%;
                letter-spacing: 0.36px;

                @media screen and (max-width: 1024px) {
                    font-size: 1.0625rem;
                }
                @media screen and (max-width: 480px) {
                    font-size: 0.875rem;
                }
                @media screen and (max-width: 375px) {
                    font-size: 0.8125rem;
                }
            }

            span, p {
                @include mixins.mainText;

            }
        }

        .section_title{
            @include mixins.subtitleText;
            text-transform: uppercase;
            margin-bottom: 24px;
            @media screen and (max-width: 1024px) {
                margin-bottom: 20px;
            }
            @media screen and (max-width: 480px) {
                margin-bottom: 8px;
            }
        }

        .sectionImg{
            margin-top: 21;

            @media screen and (max-width: 1024px) {
                margin-top: 33px;
            }
            @media screen and (max-width: 768px) {
                margin-top: 28px;
            }

            @media screen and (max-width: 480px) {

            }
              @media screen and (max-width: 375px) {
                
            }

        }

        .divider{
            width: 100%;
            height: 1px;
            background: var(--divider, rgba(255, 255, 255, 0.05));
        }









    }


</style>