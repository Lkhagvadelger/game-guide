import { EmailType } from "./types";
export const enum Language {
  Mongolian = "mn",

}
export const emailTemplates = (lang: Language, type: EmailType, data: {}) => {

  const a = [
    {
      type: EmailType.OneTimeLoginCode,
      email: {
        mn: { subject: "Нэг цэг - Баталгаажуулах код", body: ` Баталгаажуулах код: {code}` },
      },
    },
  ];
  const applyData = () => {
    if (a.filter((r) => r.type == type).length === 0)
      return { subject: "", body: "" };

    if (!a.filter((r) => r.type == type)[0].email[lang])
      return { subject: "", body: "" };

    let selectedTemplate = a.filter((r) => r.type == type)[0].email[lang];

    return {
      subject: selectedTemplate.subject.replace(
        /{([^{}}]+)}/g,
        (_match, valueKey) => {
          for (const [k, v] of Object.entries(data)) {
            if (k == valueKey) return v + "";
          }
          return _match;
        }
      ),
      body: selectedTemplate.body.replace(
        /{([^{}}]+)}/g,
        (_match, valueKey) => {
          for (const [k, v] of Object.entries(data)) {
            if (k == valueKey) return v + "";
          }
          return _match;
        }
      ),
    };
  };
  return applyData();
};
