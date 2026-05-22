//Back-end layer input validation
const FIELD_WHITELIST_RULES = {
  sections: {
    regex: /^[0-9,\s-]*$/,
    message: "Sections only allow digits, commas, spaces, and hyphens.",
  },
  courseCode: {
    regex: /^[A-Za-z0-9\s-]*$/,
    message: "Course code only allows letters, digits, spaces, and hyphens.",
  },
  term: {
    regex: /^[A-Za-z0-9\s/-]*$/,
    message: "Term only allows letters, digits, spaces, / and -.",
  },
  courseTitle: {
    regex: /^[A-Za-z0-9\s.,:;()\-/%&+#'"]*$/,
    message: "Course title contains unsupported characters.",
  },
  deliveryMode: {
    regex: /^[A-Za-z\s-]*$/,
    message: "Delivery mode only allows letters, spaces, and hyphens.",
  },
  assessmentsSummary: {
    regex: /^[A-Za-z0-9\s.,:;()\-/%&+#'"]*$/,
    message: "Assessment summary contains unsupported characters.",
  },
  skillOtherText: {
    regex: /^[A-Za-z0-9\s.,:;()\-/%&+#'"]*$/,
    message: "Other skill contains unsupported characters.",
  },
  skillsDetails: {
    regex: /^[A-Za-z0-9\s.,:;()\-/%&+#'"]*$/,
    message: "Skills details contains unsupported characters.",
  },
  safetyDetails: {
    regex: /^[A-Za-z0-9\s.,:;()\-/%&+#'"]*$/,
    message: "Safety details contains unsupported characters.",
  },
  additionalComments: {
    regex: /^[A-Za-z0-9\s.,:;()\-/%&+#'"]*$/,
    message: "Comments contain unsupported characters.",
  },
};

const EMAIL_WHITELIST = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function validateSurveyInputWhitelist(req, res, next) {
  const form = req.body?.form;
  const submittedBy = req.body?.submittedBy;

  if (!form || typeof form !== "object") {
    return res
      .status(400)
      .json({ error: "Invalid survey payload: form is required." });
  }

  const invalidFields = [];

  for (const [field, rule] of Object.entries(FIELD_WHITELIST_RULES)) {
    const value = form[field];
    if (value == null || typeof value !== "string" || value === "") continue;

    if (!rule.regex.test(value)) {
      invalidFields.push({ field, message: rule.message });
    }
  }

  if (typeof submittedBy === "string" && submittedBy !== "") {
    if (!EMAIL_WHITELIST.test(submittedBy)) {
      invalidFields.push({
        field: "submittedBy",
        message: "Email format is invalid.",
      });
    }
  }

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: "Input contains unsupported characters.",
      invalidFields,
    });
  }

  return next();
}

module.exports = {
  validateSurveyInputWhitelist,
};

