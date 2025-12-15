<template>

    <div class="footer">
        <div class="container">
            <div class="footer_wrapper">
                <div class="footer_content">
                    <div class="footer_content_main">
                        <h1>
                            Tilo Lab
                        </h1>

                        <a href="tel:+380000000000">+380 00 000 00 00</a>

                        <div class="socials">
                            <button>
                                <SvgIcon name="inst-icon" size="big"/>

                            </button>
                            <button>
                                <SvgIcon name="telegram-icon" size="big"/>
                                
                            </button>

                        </div>


                    </div>
                    <div class="footer_content_links">
                        <div class="footer_content_links_nav">
                            <nav>
                                <h3>Навігація</h3>
                                <ul>
                                    <li>Про нас</li>
                                    <li>Каталог</li>
                                    <li>FAQ</li>
                                </ul>
                            </nav>

                        </div>
                        <div class="footer_content_links_docs">
                            <h3>
                                Документи
                            </h3>
                            <ul>
                                <li>
                                    Політика конфіденційності
                                </li>
                                <li>
                                    Оплата і доставка
                                </li>
                                <li>
                                    Обмін і гарантія
                                </li>
                                <li>
                                    Публічна оферта
                                </li>
                            </ul>

                        </div>

                    </div>
                    

                </div>
                <div class="footer_subscribe">
                    <h3>
                        Залишайся з TiloLab
                    </h3>
                    <input type="text" placeholder="Твоя електронна пошта">
                    <p>
                        Я погоджуюсь з Політикою конфіденційності та даю згоду на обробку моїх
                        персональних даних та погоджуюся отримувати комерційні повідомлення електронною поштою.
                    </p>

                </div>

            </div>
           
           
        </div>
    </div>

</template>



<script setup>

    import SvgIcon from './shared/SvgIcon.vue';






</script>




<style lang="scss">

    .footer{

        width: 100%;
        height: 100%;
        position: relative;
        color: white;
        padding-block: 2rem;
        border-top: 1px solid var(--accent-grey)
    }

    .footer_wrapper{
        display: grid;
        grid-template-columns: 2fr 1fr;
        h3{
            text-transform: uppercase;
            font-size: 0.9rem;
            font-weight: 600;
        }

        ul{
            display: flex;
            flex-direction: column;
            margin-top: 1rem;;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 0.7rem;
         

            li{
                font-size: 0.8rem;
                color: var(--dark-text);
                transition: all ease 0.3s;
                cursor: pointer;


            }

            @media screen and (min-width: 1024px) {
                li:hover{
                    color: var(--accent-color);
                    transition: all ease 0.3s;

                }
                
            }
            
        }
    }

    .footer_content{
        display: grid;
        grid-template-columns: 1fr 2fr;
        

        &_main{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 1rem;

            h1{
                font-size: 1.7rem;
                font-weight: 600;
                transform: translateY(-30%);
            }

            a{
                transition: all ease 0.3s;
                @media screen and (min-width: 1024px) {
                    &:hover{
                        color: var(--accent-color);
                        transition: all ease 0.3s;
                    }
                    
                }
            }

            .socials {

                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 1rem;

                

                button{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--accent-color);
                    cursor: pointer;
                    border-radius: 5px;
                    width: 25px;
                    height: 25px;

                }

                svg{
                    width: 100%;
                    height: 100%;
                    padding: 6px;

                }
              
            }

        }

        &_links{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 3rem;
        }

    }

    .footer_subscribe{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.8rem;
        input{
            width: 80%;
            height: auto;
            background: var(--accent-grey);
            padding: 5px;
            border-radius: 5px;
            font-size: 0.9rem;
            color: var(--text-color);

        }
        input::placeholder{
            color: rgb(197, 195, 195);
            font-size: 0.9rem;
        }

        p{
            font-size: 0.75rem;
            color: var(--dark-text);
        }
    }



</style>