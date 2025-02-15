import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { IntlProvider, FormattedMessage } from "react-intl";

// Translation messages
const messages = {
  en: {
    greeting: "Hello!",
    changeLanguage: "Change Language",
    currentLanguage: "Current Language: English",
  },
  hi: {
    greeting: "नमस्ते!",
    changeLanguage: "भाषा बदलें",
    currentLanguage: "वर्तमान भाषा: हिंदी",
  },
};

const LanguageScreen = () => {
  const [locale, setLocale] = useState("en");

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "hi" : "en");
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          <FormattedMessage id="greeting" />
        </Text>
        <Text style={styles.language}>
          <FormattedMessage id="currentLanguage" />
        </Text>
        <Button
          title={messages[locale].changeLanguage}
          onPress={toggleLanguage}
        />
      </View>
    </IntlProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  greeting: { fontSize: 24, marginBottom: 10 },
  language: { fontSize: 18, marginBottom: 20 },
});

export default LanguageScreen;
