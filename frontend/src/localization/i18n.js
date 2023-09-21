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
        nav: {
          chatName: 'Hexlet Chat',
          logOut: 'Выйти',
        },
        chat: {
          channels: 'Каналы',
          messages: 'сообщений',
          form: 'Введите сообщение',
        },
        login: {
          'come': 'Войти',
          'yourName': 'Ваш ник',
          'password': 'Пароль',
          'no account': 'Нет аккаунта',
          'registration': 'Регистрация'
        },
        signup: {
          'registration': 'Регистрация',
          'userName': 'Имя пользователя',
          'password': 'Пароль',
          'resPassword': 'Подтвердите пароль',
          'btnRegistration': 'Зарегестрироваться'
        },
        errorPage: {
          'pageIsNotFound': 'Страница не найдена',
          'ButYouCanMoveOn': 'Но вы можете перейти',
          'onMainPage': 'на главную страницу',
          'resPassword': 'Подтвердите пароль',
          'btnRegistration': 'Зарегестрироваться'
        },
        modal: {
          addChannel: 'Добавить канал',
          removeChannel: 'Удалить канал',
          renameChannel: 'Переименовать канал',
          btnCreate: 'Cоздать',
          btnCancel: 'Отменить',
          btnDelete: 'Удалить',
          shure: 'Уверены?',
        },
        tubBar: {
          channels: 'Удалить',
          newChannel: 'Переименовать'
        },
      }
    }
  });

export default i18n;