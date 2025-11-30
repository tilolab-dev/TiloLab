<template>

    <section class="modal auth-modal">
        <div 
            class="modal-wrapper" 
            :class="{'login_window': loginWindow, 'register_window': !loginWindow}"
            ref="modalWrapper"
            >
            <!-- :style="{'flex-direction': loginWindow ? 'row-reverse' : 'row'}" -->

            <div class="form login" v-if="!loginWindow">
                <h2
                >Вход в аккаунт</h2>
                <p
                    class="main_text"
                >Войдите, чтобы продолжить. Если у вас ещё нет аккаунта, зарегистрируйтесь!</p>
                <form>
                    <label 
                        for="login-email "
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="login-email" 
                        placeholder="Введіть вашу електронну пошту"
                        maxlength="40"
                        v-model="mail"
                        required 
                    />

                    <label 
                        for="login-password"

                    >
                        Пароль
                    </label>
                    <input 
                        type="password"
                        id="login-password" 
                        placeholder="Введіть ваш пароль"
                        required
                        v-model="password"
                        maxlength="30"
                    />

                    <div class="button-wrapper">
                        <button 
                            class="forgot-password whitespace-nowrap"
                        >
                            Забыли пароль?
                        </button>
                        <button 
                            @click="handleLogin"
                            type="button"
                        >
                            Войти
                        </button>
                        
                    </div>
                    
                    <p
                        class="text-center w-full text-[var(--primary-color)]"
                    >
                    Нет аккаунта? 
                        <button 
                            class="switch-tab cursor-pointer"
                            @click="loginWindow = true"
                        >
                            Создать
                        </button></p>
                </form>

            </div>
            <div class="form auth" v-else-if="!supabaseConfirmState && loginWindow">
                <h2
                    class="mb-2 text-2xl font-bold text-[var(--primary-color)] dark:text-[var(--dark-font-color)]"
                >
                    Создайте аккаунт
                </h2>
                <p
                    class="mb-5 dark:text-[var(--dark-font-color)]"
                >
                    Зарегистрируйтесь, чтобы получить доступ ко всем возможностям. Это быстро и просто!
                </p>
                <form class="flex flex-col gap-1 max-sm:gap-0">
                    <div class="name-wrapper flex justify-center items-center gap-5 max-sm:flex-col max-sm:gap-0">
                        <div class="basis-1/2 flex-1 max-sm:flex-1 max-sm:w-full">
                            <label for="register-name dark:text" class="dark:text-[var(--dark-font-color)]">Имя</label>
                            <input 
                                type="text" 
                                id="register-name" 
                                v-model="userName"
                                required 
                            />
                        </div>
                        
                        <div class="basis-1/2 flex-1 max-sm:flex-1 max-sm:w-full">
                            <label for="register-surname" class="dark:text-[var(--dark-font-color)]">Отчество</label>
                            <input 
                                type="text" 
                                id="register-surname"
                                v-model="userSurname"
                            />
                        </div>
                       
                        <div class="basis-1/2 flex-1 max-sm:flex-1 max-sm:w-full">
                            <label for="register-family" class="dark:text-[var(--dark-font-color)]">Фамилия</label>
                            <input 
                                type="text" 
                                id="register-family" 
                                v-model="userFamily"
                                required 
                            />
                        </div>
                    
                    </div>
                    

                    <label for="register-email" class="dark:text-[var(--dark-font-color)]">Email</label>
                    <input 
                        type="email" 
                        id="register-email" 
                        v-model="mail"
                        required 
                    />

                    <label for="phone-number" class="dark:text-[var(--dark-font-color)]">Номер телефона</label>
                    <input 
                        type="tel" 
                        id="phone-number" 
                        v-model="phoneNumber"
                        required 
                    />

                    <div class="pass-wrapper flex justify-center items-center gap-5 max-sm:flex-col max-sm:gap-0">
                        <div class="w-full flex flex-col ">
                            <label for="register-password" class="dark:text-[var(--dark-font-color)]">Пароль</label>
                            <input 
                                type="password" 
                                id="register-password" 
                                v-model="password"
                                required 
                            />
                        </div>
                     

                        <div class="w-full flex flex-col">
                            <label for="register-password-confirm" class="dark:text-[var(--dark-font-color)]">Повторите пароль</label>
                            <input 
                                type="password" 
                                id="register-password-confirm" 
                                v-model="confirmedPass"
                                required 
                            />
                        </div>
                       
                    </div>

                    

                    <button
                        class="register-btn "
                        @click="handleRegister"  
                        type="button"              
                    >
                        Зарегистрироваться
                    </button>
                    
                    <p class="dark:text-[var(--dark-font-color)] max-sm:mt-6">Уже есть аккаунт? 
                        <button 
                            class="switch-tab dark:text-[var(--dark-font-color)]"
                            @click="loginWindow = false"
                        >
                        Войти
                        </button>
                    </p>

                    <small class="dark:text-[var(--dark-font-color)] max-sm:mt-2">Регистрируясь, вы соглашаетесь с <span >условиями использования</span> и <span >политикой конфиденциальности</span>.</small>
                </form>

            </div>
            <div class="form auth relative" v-else>
                <button @click="supabaseConfirmState = false" class="dark:text-[var(--dark-font-color)]">
                    Повернутись назад
                </button>
                <h2
                    class="mb-2 text-2xl font-bold text-[var(--primary-color)] dark:text-[var(--dark-font-color)]"
                >
                    Введіть пароль отриманий на email
                </h2>
                <p
                    class="mb-5 dark:text-[var(--dark-font-color)]"
                >
                    Якщо ви не отримували пароль, перевірте правильність введених даних та спробуйте ще.
                </p>
                <!-- <form class="flex flex-col gap-1">
                    <div class="name-wrapper flex justify-center items-center gap-5">
                        <div class="basis-1/2 flex-1">
                            <label for="register-name">Имя</label>
                            <input 
                                type="text" 
                                id="register-name" 
                                v-model="userName"
                                required 
                            />
                        </div>
                        
                        <div class="basis-1/2 flex-1">
                            <label for="register-surname">Отчество</label>
                            <input 
                                type="text" 
                                id="register-surname"
                                v-model="userSurname"
                            />
                        </div>
                       
                        <div class="basis-1/2 flex-1">
                            <label for="register-family">Фамилия</label>
                            <input 
                                type="text" 
                                id="register-family" 
                                v-model="userFamily"
                                required 
                            />
                        </div>
                    
                    </div>
                    

                    <label for="register-email">Email</label>
                    <input 
                        type="email" 
                        id="register-email" 
                        v-model="mail"
                        required 
                    />

                    <label for="phone-number">Номер телефона</label>
                    <input 
                        type="tel" 
                        id="phone-number" 
                        v-model="phoneNumber"
                        required 
                    />

                    <div class="pass-wrapper flex justify-center items-center gap-5">
                        <div class="w-full flex flex-col ">
                            <label for="register-password">Пароль</label>
                            <input 
                                type="password" 
                                id="register-password" 
                                v-model="password"
                                required 
                            />
                        </div>
                     

                        <div class="w-full flex flex-col">
                            <label for="register-password-confirm">Повторите пароль</label>
                            <input 
                                type="password" 
                                id="register-password-confirm" 
                                v-model="confirmedPass"
                                required 
                            />
                        </div>
                       
                    </div>

                    

                    <button
                        class="register-btn"
                        @click="handleRegister"  
                        type="button"              
                    >
                        Зарегистрироваться
                    </button>
                    
                    <p>Уже есть аккаунт? 
                        <button 
                            class="switch-tab"
                            @click="loginWindow = false"
                        >
                        Войти
                        </button>
                    </p>

                    <small>Регистрируясь, вы соглашаетесь с <span >условиями использования</span> и <span >политикой конфиденциальности</span>.</small>
                </form> -->

                <div class="flex flex-col items-center gap-4">
                <div class="flex gap-2">
                <input
                    v-for="(digit, index) in code"
                    :key="index"
                    :ref="el => inputs[index] = el" 
                    v-model="code[index]"
                    type="text"
                    maxlength="1"
                    @input="handleInput(index, $event)"
                    @keydown="handleBackspace(index, $event)"
                    class="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-[var(--dark-border-color)]"
                />
                </div>
                <button
                    class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition dark:bg-[--dark-color] dark:border dark:border-[var(--dark-border-color)]"
                    @click="handleConfirmRegister"
                >
                Подтвердить
                </button>
            </div>
            </div>
            <div class="background" 
                ref="background"
                >
                <!-- :style="{'left': loginWindow ? '0' : '50%' }"  -->

                <div 
                    class="absolute top-0 h-full bg-[var(--primary-color)] w-full flex items-center justify-center flex-col"
                >
                <!-- :class="{'left-0': loginWindow, 'right-0': !loginWindow}" -->

                    <!-- <img 
                        v-if="loginWindow"
                        src="@/public/images/TiloLab1.webp" 
                        alt="preview"
                    >
                    <img 
                        v-else
                        src="@/public/images/TiloLab2.webp" 
                        alt="preview"
                    > -->
                    <!-- <img :src="loginWindow ? '/images/TiloLab1.webp' : '/images/TiloLab2.webp'" />
                      -->
                    <NuxtImg
  :src="loginWindow ? '/images/TiloLab1.webp' : '/images/TiloLab2.webp'"
  alt="preview"
  width="700"
  height="450"
  loading="lazy"
  class="preview-image"
/>

                    <h2>Добро пожаловать в интернет-магазин korzinka.in.ua</h2>
            
                </div>
               

            </div>
            <button 
                class="absolute z-20 top-5 right-5 p-2 cursor-pointer border border-solid rounded-full" :style="{'border-color': !loginWindow ? 'var(--main-accent)' : 'var(--primary-color)'}"
                @click="modalStore.closeModal"
            >
                <!-- <SvgIcon name="close-btn" size="micro" :fill="!loginWindow ? 'var(--main-accent)' : 'var(--primary-color)'"/> -->
            </button>
      </div>


    </section>


</template>


<script setup>
    // import SvgIcon from "../shared/SvgIcon.vue";
    import { ref, onMounted, onUnmounted, defineEmits, watch } from "vue";
    import { useModalStore } from "@/store/modal-store";
    import { useAuthStore } from "@/store/auth-store";
    import gsap from "gsap";

    const userName = ref("");
    const userSurname = ref("");
    const userFamily = ref("");
    const phoneNumber = ref("");
    const mail = ref("");
    const password = ref("");
    const confirmedPass = ref("");
    const loginWindow = ref(false);
    const code = ref(['', '', '', '', '', ''])
    const inputs = ref([]);
    const supabaseConfirmState = ref(false);

    const modalWrapper = ref(null);
    const background = ref(null);

    const modalStore = useModalStore();

    const authStore = useAuthStore();

    const emit = defineEmits();



    const animateModalHeight = () => {

    gsap.to(modalWrapper.value, {
        duration: 0.5,
        height: loginWindow.value ? "650" : "550",
        ease: "power2.out"
    });
    };

    const animateBackground =  () => {
        gsap.to(background.value, { left: loginWindow.value ? "0%" : "-100%", duration: 0.6, ease: "power2.inOut" });
    };

    watch(loginWindow, () => {
        userName.value = "";
        userSurname.value = "";
        phoneNumber.value = "";
        userFamily.value = "";
        mail.value = "";
        password.value = "";
        confirmedPass.value = "";
        animateModalHeight();
        animateBackground();
    })



const handleInput = (index, event) => {
    if (!/\d/.test(event.target.value)) {
        code.value[index] = '';
        return;
    }

    if (event.target.value.length > 1) {
        code.value[index] = event.target.value.slice(-1);
    }

    if (index < 5 && event.target.value !== '') {
        inputs.value[index + 1]?.focus(); 
    }
};

const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !code.value[index]) {
        inputs.value[index - 1]?.focus();
    }
};


    class Auth {

        constructor(mail, password, confirmedPass = null) {
            this.mail = mail;
            this.password = password;
            this.confirmedPass = confirmedPass;
        }

        static regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        static regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        validateEmail() {
            const validMail = Auth.regEmail.test(this.mail.trim());
            if (!validMail) {
                emit('tooltip', {
                    status: 'error',    
                    message: 'Невірний формат електронної пошти'
                })
            }
            return validMail;
        }

        validatePassword() {
            const validPath = Auth.regPassword.test(this.password.trim());
            if (!validPath) {
                emit('tooltip', {
                    status: 'error',
                    message: 'Невірний формат паролю'
                })
            }
            return validPath;
        }

        validateConfirmedPassword() {
            return this.password === this.confirmedPass;
        }

        async fetchSendVerifyPass(link, method, data = {}) {

            const verifyData = new FormData();

            verifyData.append('data', JSON.stringify({
                mail: mail.value,
            }))

            const processVerify = await $fetch('/api/auth?auth=sendVerifyPass', {
                method: 'POST',
                body: verifyData
            })


            if (processVerify.status === 200) {
                supabaseConfirmState.value = true;
            } else {
                emit('tooltip', {
                    status: 'error',
                    message: `Виникла помилка ${processVerify.message}`
                })
            }

            return {
                status: processVerify.status,
                message: processVerify.message
            }

            
        }
        async checkVerifyPass(link, method, data = {}) {

            const verifyData = new FormData();


            verifyData.append('data', JSON.stringify({
                email: mail.value,
                token: data.token
            }))

            const processVerify = await $fetch(`/api/${link}`,  {
                method: method,
                body: verifyData
                
            })

            if (processVerify.status === 200) {

                const registerUser = await this.fetchRequest('auth?auth=register', 'POST', {
                    userName: userName.value,
                    userSurname: userSurname.value,
                    phoneNumber: phoneNumber.value,
                    userFamily: userFamily.value,
                    mail: mail.value,
                    password: password.value,
                });



                if (registerUser.status === 200) {
                    userName.value = '';
                    userSurname.value = '';
                    phoneNumber.value = '';
                    userFamily.value = '';
                    mail.value = '';
                    password.value = '';
                    confirmedPass.value = '';
                    supabaseConfirmState.value = false;
                    code.value = ['', '', '', '', '', ''];
                    inputs.value = [];
                    loginWindow.value = false;
                    emit('tooltip', {
                        status: 'success',
                        message: registerUser.message
                    })

                } else {
                    emit('tooltip', {
                        status: 'error',
                        message: registerUser.message
                    })
                }



                // emit('tooltip', {
                //     status: 'success',
                //     message: processVerify.message
                // })
            } else {
                emit('tooltip', {
                    status: 'error',
                    message: 'Паролі не співпадають'
                })
            }

        }

        async fetchRequest(link, method, data = {}) {

            const formData = new FormData();

            formData.append('data', JSON.stringify(data));

            const response = await $fetch(`/api/${link}`, {
                method: method,
                body: formData
            })

            if (response.status === 200) {
                emit('tooltip', {
                    status: 'success',
                    message: response.message
                })

                setTimeout(() => {
                    loginWindow.value = false;
                }, 1500);
            }


            return response;
            


        }

    }










    const handleLogin = async () => {


        const loginAuth = new Auth(mail.value, password.value);

        // if (!mail.value && !password.value) {
        //     emit('tooltip', {
        //         status: 'error',
        //         message: 'Заповніть всі поля'
        //     })
        //     return null;
        // }

        // if (!loginAuth.validateEmail()) return null;

        // if (!loginAuth.validatePassword()) return null;

        const loginUser = await loginAuth.fetchRequest('auth?auth=login', 'POST', {

            mail: mail.value,
            password: password.value
            
        })
 
        if (loginUser.statusCode === 200) {
            emit('tooltip', {
                status: 'success',
                message: 'Ви успішно увійшли'
            })
        } else {
            emit('tooltip', {
                status: 'error',
                message: 'Щось пішло не так'
            })
            return;
        }

        if (loginUser.user) {
            authStore.setUser(loginUser.user);
        }

        setTimeout(() => {
            modalStore.closeModal();
        },1000);
        
    }

    const handleRegister = () => {

        const registerAuth = new Auth(mail.value, password.value, confirmedPass.value);

        if (!userName.value && !mail.value && !password.value && !confirmedPass.value) {
            emit('tooltip', {
                status: 'error',
                message: 'Заповніть всі поля'
            })
            return null;
        }

        if (!registerAuth.validateEmail()) return;

        if (!registerAuth.validatePassword()) return;

        if (!registerAuth.validateConfirmedPassword()) {
            emit('tooltip', {
                status: 'error',
                message: 'Паролі не співпадають'
            })
            return ;
        }

        registerAuth.fetchSendVerifyPass('auth?auth=sendVerifyPass', 'POST', {
            mail: mail.value
        })





        // Send verify password

        // const sendVerifyPass = async () => {

        //     const verifyData = new FormData();

        //     verifyData.append('data', JSON.stringify({
        //         mail: mail.value,
        //     }))

        //     const processVerify = await $fetch('/api/auth?auth=sendVerifyPass', {
        //         method: 'POST',
        //         body: verifyData
        //     })

        //     return {
        //         status: processVerify.status,
        //         message: processVerify.message
        //     }



        // }


        

    }

    const handleConfirmRegister = () => {

        const registerAuth = new Auth(mail.value, password.value, confirmedPass.value);

        const codeValue = code.value.join(',').replaceAll(',','');


        

        if (codeValue.length < 6) {
            emit('tooltip', {
                status: 'error',
                message: 'Код повинен бути 6 цифр'
            })
            inputs.value = [];
            code.value = ['', '', '', '', '', ''];
            inputs.value[0]?.focus();

            return;
        }

        registerAuth.checkVerifyPass('auth?auth=checkVerifyPass', 'POST', {
            email: mail.value,
            token: codeValue
        })




       

        
    }



    const handleInvalid = (e) => {
        e.preventDefault();
    }


    onMounted(() => {
        document.addEventListener("invalid", handleInvalid, true);

        gsap.set(modalWrapper.value, { height: loginWindow.value ? "650px" : "500px" });
        gsap.set(background.value, { x: loginWindow.value ? "0%" : "0%" });
    })

    onUnmounted(() => {
        document.removeEventListener("invalid", handleInvalid, true);
    })




    useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/TiloLab1.webp'
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/TiloLab2.webp'
    }
  ]
})



</script>


<style lang="scss" scoped>




    .modal{

        

        .login_window{
            flex-direction: row-reverse;
        }

        .register_window{
            flex-direction: row;
        }

      





        @media screen and (max-width: 768px) {
            &{
                padding: 0;
                .modal-wrapper{
                    width: 100vw;
                    height: 100vh !important;
                  
                    border-radius: 0;
                    overflow: scroll;
                    form{
                        padding-bottom: 4em;

                    }
                    .form{
                        padding: 2em;

                    }
                }
            }
        }
    }

    .auth-modal{
        color: var(--primary-color)
    }

    .modal-wrapper{
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        width: 75vw;
        // position: relative;
        // flex-direction: row;
        padding: 0;

        // gap: 50px;
        // height: auto;
    }

    .form{
        flex: 1;
        padding: 2em;
        height: 100%;
        // flex-basis: 40%
    }

    .login{
        padding-right: 0;
    }

    .auth{
        padding-left: 0;
        
    }

    label{
        position: relative;
        bottom: 5px;
    }

    input{
        border: 1px solid var(--dark-color);
        border-radius: 8px;
        padding: 10px 15px;
        width: 100%;
        margin-bottom: 15px;
        color: black;
    }

    .background{
        // position: absolute;
        // width: 50%;
        height: 100%;
        flex: 1;

        // background-color: var(--primary-color);
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        color: var(--bg-color);
        transition: all ease 0.3s;
        // padding: 20px;
        z-index: 20;

        img{
            // background: var(--bg-color);
            // border: 2px solid var(--main-accent);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        h2{
            color: white;
            width: 70%;
            text-align: center;
            position: absolute;
            bottom: 5%;
            left: 20px;
            z-index: 1;

        }
        @media screen and (max-width: 768px) {
            &{
                display: none;
            }
        }
    }

    .button-wrapper{
        margin: 50px 0 30px;
        button{
            flex: 1;
            padding: 10px 15px;
            border: 1px solid var(--primary-color);
            border-radius: 8px;
            background: var(--primary-color);
            color: var(--bg-color);
            cursor: pointer;
        }
        .forgot-password{
            background: transparent;
            border-color: red;
            color: red;
        }
    }
    .register-btn{
        flex: 1;
        margin: 0 auto;
        max-width: 300px;
        padding: 10px 15px;
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--bg-color);
        cursor: pointer;
    }

    .dark .modal-wrapper{
        background: var(--dark-light-grey);
    }
    .dark input {
        background: var(--dark-grey);
        color: var(--dark-font-color)
    }

    .dark .background{
        background: var(--dark-color);
    }

      .login{
            h2{
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);

                .dark & {
                color: var(--dark-font-color);
                }
            }
            .main_text{
                margin-bottom: 1.25rem;

                .dark & {
                color: var(--dark-font-color);
                }
            }
            label{
                .dark & {
                    color: var(--dark-font-color);
                }
            }
            input{
                .dark & {
                border-width: 1px;
                border-style: solid;
                border-color: var(--dark-border-color);
                }
            }

            .button-wrapper{
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5;
            }
        }



</style>