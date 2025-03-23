/* global window */
import en from "./en";
import ar from "./ar";
import cn from "./cn";
import de from "./de";
import es from "./es";
import fr from "./fr";
import id from "./id";
import it from "./it";
import jp from "./jp";
import ko from "./ko";
import pt from "./pt";
import ru from "./ru";
import th from "./th";
import tr from "./tr";
import tw from "./tw";
import vi from "./vi";
import ms from "./ms";
import cs from "./cs";
import da from "./da";
import nl from "./nl";
import no from "./no";
import pl from "./pl";
import fi from "./fi";
import sv from "./sv";
import el from "./el";
import ua from "./ua";
import he from "./he";
import hi from "./hi";

// Defines the fallback language as English
let $languages = ["en","ar","cn","de","es","fr","id","it","jp","ko","pt","ru","th","tr","tw","vi","ms","cs","da","nl","no","pl","fi","sv","el","ua","he","hi"];
const $messages = {en,ar,cn,de,es,fr,id,it,jp,ko,pt,ru,th,tr,tw,vi,ms,cs,da,nl,no,pl,fi,sv,el,ua,he,hi};

function translate(key, messages) {
  if (messages) {
    // Return the translation from the first language in the languages array
    // that has a value for the provided key.
    for (const lang of $languages) {
      if (!messages[lang]) break;

      let message = messages[lang];

      // Splits the key at '.' except where escaped as '\.'
      const keys = key.match(/(?:\\.|[^.])+/g);

      for (let i = 0; i < keys.length; i += 1) {
        const property = keys[i];
        const value = message[property];

        // If value doesn't exist, try next language
        if (!value) break;

        if (i === keys.length - 1) return value;

        // Move down to the next level of the messages object
        message = value;
      }
    }
  }

  return undefined;
}

function t(key) {
  let v = translate(key, $messages);
  if (!v && window && window.x_spreadsheet && window.x_spreadsheet.$messages) {
    v = translate(key, window.x_spreadsheet.$messages);
  }
  return v || "";
}

function tf(key) {
  return () => t(key);
}

// If clearLangList is set to false, lang will be added to the front of the
// languages array. The languages in the language array are searched in order
// to find a translation. This allows the use of other languages as a fallback
// if lang is missing some keys. The language array is preloaded with English.
// To set the languages array to only include lang, set clearLangList to true.
function locale(lang, message, clearLangList = false) {
  if (clearLangList) {
    $languages = [lang];
  } else {
    // Append to front of array.
    // Translation method will use the first language in the list that has a
    // matching key.
    $languages.unshift(lang);
  }

  if (message) {
    $messages[lang] = message;
  }
}

export default {
  t,
};

export { locale, t, tf };
