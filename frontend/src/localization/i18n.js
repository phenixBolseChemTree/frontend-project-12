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
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          nav: {
            chatName: 'Hexlet Chat1',
            logOut: 'Выйти1',
          },
          chat: {
            channels: 'Каналы1',
            messages: 'сообщений1',
            formPlaceholder: 'Введите сообщение...1',
            send: 'Отправить1'
          },
          login: {
            come: 'Войти1',
            yourName: 'Ваш ник1',
            password: 'Пароль1',
            noAccount: 'Нет аккаунта?1',
            registration: 'Регистрация1',
            btnSend: 'Отправить1'
          },
          signup: {
            registration: 'Регистрация1',
            userName: 'Имя пользователя1',
            password: 'Пароль1',
            resPassword: 'Подтвердите пароль1',
            btnRegistration: 'Зарегестрироваться1'
          },
          error404Page: {
            pageIsNotFound: 'Страница не найдена1',
            ButYouCanMoveOn: 'Но вы можете перейти1',
            onMainPage: 'на главную страницу1',
            resPassword: 'Подтвердите пароль1',
            btnRegistration: 'Зарегестрироваться1'
          },
          error: {
            errorText: 'Ошибка1',
            AlertUserAlreadyExists: 'Неверные имя пользователся или пароль1',
            minWord3: 'Минимум 3 буквы1',
            maxWord20: 'Максимум 20 букв1',
            minСharacters2: 'Минимум 2 символа1',
            maxCharacters50: 'Максимум 50 символов1',
            requiredField: 'Обязательное поле1'
          },
          modal: {
            addChannel: 'Добавить канал1',
            removeChannel: 'Удалить канал1',
            renameChannel: 'Переименовать канал1',
            btnCreate: 'Cоздать1',
            btnCancel: 'Отменить1',
            btnDelete: 'Удалить1',
            shure: 'Уверены?1',
          },
          dropdownBar: {
            channels: 'Удалить1',
            newChannel: 'Переименовать1'
          },
        }
      }
    }
  });

export default i18n;