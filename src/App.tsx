import { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import {
  loginFormSchema,
  registrationFormSchema,
  contactFormSchema,
} from "./schemas/formSchema";
import { Button } from "./components/ui/button";

function App() {
  const [activeForm, setActiveForm] = useState<
    "login" | "register" | "contact"
  >("login");

  const formSchemas = {
    login: {
      title: "Login",
      schema: loginFormSchema,
    },
    register: {
      title: "Register",
      schema: registrationFormSchema,
    },
    contact: {
      title: "Contact Us",
      schema: contactFormSchema,
    },
  };

  const handleSubmit = async (data: any) => {
    try {
      console.log("Form submitted:", data);
      // Here you would typically make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Form Type Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          {(["login", "register", "contact"] as const).map((formType) => (
            <Button
              variant="ghost"
              key={formType}
              onClick={() => setActiveForm(formType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  activeForm === formType
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </Button>
          ))}
        </div>

        {/* Active Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {formSchemas[activeForm].title}
            </h2>
          </div>
          <div className="p-6">
            <DynamicForm
              schema={formSchemas[activeForm].schema}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
