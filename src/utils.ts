import { User } from 'schemaTypes';

const firebaseDocToUser = (
  doc: FirebaseFirestore.DocumentSnapshot,
  data: FirebaseFirestore.DocumentData
): User => ({
  id: doc.id,
  about: data.about ?? {},
  username: data.username,
  displayName: data.displayName,
  email: data.email
});

const attributeToSearchableText = (attribute: string) => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return attribute
    .toString()
    .toLowerCase()
    .replace(p, c => b.charAt(a.indexOf(c)));
};

const getStartsWithCodes = (
  search: string
): { startcode: string; endcode: string } => {
  const strlength = search.length;
  const strFrontCode = search.slice(0, strlength - 1);
  const strEndCode = search.slice(strlength - 1, search.length);

  const startcode = search;
  const endcode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

  return { startcode, endcode };
};

export { firebaseDocToUser, attributeToSearchableText, getStartsWithCodes };
