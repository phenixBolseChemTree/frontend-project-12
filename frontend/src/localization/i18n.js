import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ru: {
        translation: {
          nav: {
            chatName: 'Hexlet Chat',
            logOut: 'Выйти',
          },
          chat: {
            channels: 'Каналы',
            messages: {
              "key_one": "{{count}} сообщение",
              "key_few": "{{count}} сообщения",
              "key_many": "{{count}} сообщений"
            },
            formPlaceholder: 'Введите сообщение...',
            send: 'Отправить',
            newMessage: 'Новое сообщение',
          },
          login: {
            come: 'Войти',
            yourName: 'Ваш ник',
            password: 'Пароль',
            noAccount: 'Нет аккаунта?',
            registration: 'Регистрация',
            btnSend: 'Отправить'
          },
          signup: {
            registration: 'Регистрация',
            userName: 'Имя пользователя',
            password: 'Пароль',
            resPassword: 'Подтвердите пароль',
            btnRegistration: 'Зарегестрироваться'
          },
          error404Page: {
            pageIsNotFound: 'Страница не найдена',
            ButYouCanMoveOn: 'Но вы можете перейти',
            onMainPage: 'на главную страницу',
            resPassword: 'Подтвердите пароль',
            btnRegistration: 'Зарегестрироваться'
          },
          toast: {
            addChannel: 'Канал создан',
            removeChannel: 'Канал удалён',
            renameChannel: 'Канал переименован',
            'networkError': 'Ошибка сети'
          },
          error: {
            errorText: 'Ошибка',
            AlertUserAlreadyExists: 'Неверные имя пользователя или пароль',
            minWord3: 'Минимум 3 буквы',
            maxWord20: 'Максимум 20 букв',
            minWord3AndmaxWord20: 'От 3 до 20 символов',
            minCharacters6: 'Не менее 6 символов',
            minСharacters2: 'Минимум 2 символа',
            maxCharacters50: 'Максимум 50 символов',
            requiredField: 'Обязательное поле',
            samePasswords: 'Пароли должны совпадать',
            invalidNameOrPassword : 'Неверные имя пользователя или пароль'
          },
          modal: {
            addChannel: 'Добавить канал',
            removeChannel: 'Удалить канал',
            renameChannel: 'Переименовать канал',
            btnCreate: 'Cоздать',
            btnCancel: 'Отменить',
            btnDelete: 'Удалить',
            shure: 'Уверены?',
            formPlaceholder: 'Введите имя канала...',
          },
          dropdownBar: {
            delete: 'Удалить',
            rename: 'Переименовать'
          },
        }
      }
    }
  });

export default i18n;