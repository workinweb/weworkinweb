import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import GlassCard from "../../components/Cards/GlassCard";
import { getLangFromUrl, useTranslations } from "../../i18n/translations";
import {
  MessageSquare,
  Clock,
  Sparkles,
  Heart,
  Shield,
  Users,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  project: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  project?: string;
}

export default function ContactForm() {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const [status, setStatus] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    project: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.errors.name") as string;
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.form.errors.email") as string;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.form.errors.emailInvalid") as string;
      isValid = false;
    }

    if (!formData.project.trim()) {
      newErrors.project = t("contact.form.errors.project") as string;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus(t("contact.form.sending") as string);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          subject: `New Project Inquiry from ${formData.name}`,
          message:
            `Name: ${formData.name} Email: ${formData.email} Project Details: ${formData.project}
          `.trim(),
        }),
      });

      if (response.ok) {
        setStatus(t("contact.form.success") as string);
        setFormData({ name: "", email: "", project: "" });
        setErrors({});
      } else {
        setStatus(t("contact.form.error") as string);
      }
    } catch (error) {
      setStatus(t("contact.form.error") as string);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="section-title">{t("contact.title")}</h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>

            <div className="flex justify-center mb-6">
              <Player
                autoplay
                loop
                src="https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json"
                className="w-full max-w-[200px]"
                style={{ height: "150px" }}
              />
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("contact.stats.support")}
                </p>
                <p className="text-2xl font-bold text-orange-500">24/7</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("contact.stats.satisfaction")}
                </p>
                <p className="text-2xl font-bold text-orange-500">100%</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("contact.stats.response")}
                </p>
                <p className="text-2xl font-bold text-orange-500">ASAP</p>
              </motion.div>
            </div>

            {/* Benefits */}
            <div className="space-y-4 bg-white/50 dark:bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {t("contact.benefits.title")}
              </h3>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50/50 dark:bg-slate-700/50"
              >
                <MessageSquare className="w-5 h-5 text-orange-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  {t("contact.benefits.consultation")}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50/50 dark:bg-slate-700/50"
              >
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  {t("contact.benefits.response")}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50/50 dark:bg-slate-700/50"
              >
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  {t("contact.benefits.pricing")}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50/50 dark:bg-slate-700/50"
              >
                <Heart className="w-5 h-5 text-orange-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  {t("contact.benefits.care")}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50/50 dark:bg-slate-700/50"
              >
                <Shield className="w-5 h-5 text-orange-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  {t("contact.benefits.ownership")}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50/50 dark:bg-slate-700/50"
              >
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-slate-700 dark:text-slate-300">
                  {t("contact.benefits.collaboration")}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

              <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {t("contact.form.name.label")}{" "}
                    <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {t("contact.form.email.label")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {t("contact.form.project.label")}
                  </label>
                  <textarea
                    id="project"
                    rows={4}
                    value={formData.project}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.project ? "true" : "false"}
                    aria-describedby={
                      errors.project ? "project-error" : undefined
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.project
                        ? "border-red-500"
                        : "border-slate-300 dark:border-slate-600"
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500`}
                    placeholder={
                      t("contact.form.project.placeholder") as string
                    }
                  ></textarea>
                  {errors.project && (
                    <p
                      id="project-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {errors.project}
                    </p>
                  )}
                </div>

                <button type="submit" className="button-primary w-full">
                  {t("contact.form.submit")}
                </button>

                {status && (
                  <p
                    className={`text-center ${
                      status === t("contact.form.error")
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
