/*
  DSA MS survey prototypes — intentionally local and ephemeral.
  This file contains no network, analytics, cookie, or storage calls.
*/
(() => {
  "use strict";

  const O = value => value.split("|");
  const R = (id, label, options, hint = "", follow = null) => ({ id, label, type: "radio", options: O(options), hint, follow });
  const C = (id, label, options, hint = "", max = 0, exclusive = []) => ({ id, label, type: "check", options: O(options), hint, max, exclusive });
  const T = (id, label, hint = "", rows = 3) => ({ id, label, type: rows > 1 ? "textarea" : "text", hint, optional: true });
  const M = (id, label, rows, columns, hint = "") => ({ id, label, type: "matrix", rows: O(rows), columns: O(columns), hint });
  const S = (title, note, questions, repeat = "") => ({ title, note, questions, repeat });

  const experience = "No experience|Introductory exposure|Can complete basic tasks independently|Can complete advanced tasks independently";
  const development = "Not at all|A little|Somewhat|Quite a bit|A great deal|Not applicable";
  const prepAreas = "Programming|Databases and SQL|Mathematics|Statistics|Data analysis|Development tools|Technical communication|Unsure|None";
  const careerSupport = "Identifying roles or employers|Opportunity listings|Resume review|Portfolio review|Interview or assessment practice|Networking guidance|Discussing an offer|Fitting an internship with coursework|Unsure|Other|None";

  const surveys = {
    "program-short": {
      code: "S1", title: "Beginning of the Program", version: "Short", time: "5–6 minutes",
      when: "First two weeks of the first semester",
      intro: "Help us understand your starting point, goals, and support needs as you begin the DSA MS program.",
      sections: [
        S("Starting point", "Tell us where you are beginning. Written responses are optional.", [
          T("s1q1", "What was your primary undergraduate field of study?", "You may enter “Other” or “Prefer not to answer.”", 1),
          M("s1q2", "How much experience do you have in each area?", "Python programming|SQL and relational databases|Statistics and probability|Linear algebra|Data cleaning and analysis|Data visualization", experience),
          R("s1q3", "Have you been told that you need to complete any prerequisites or preparation activities?", "Yes|No|Unsure", "", { values: ["Yes"], label: "Which remain incomplete?", type: "text" }),
          C("s1q4", "In which areas would you most benefit from introductory support?", "Programming|Databases and SQL|Mathematics|Statistics|Using development tools|Academic writing or communicating results|Study strategies or time management|Unsure|Other|No introductory support needed", "Select all that apply.", 0, ["No introductory support needed"])
        ]),
        S("Goals and support", "Your answers help shape early guidance.", [
          C("s1q5", "What are your main goals for completing this program?", "Begin a career in data science or analytics|Advance in my current career|Change careers|Prepare for further study or research|Apply data skills within another field|Develop technical skills|Explore career possibilities|Other", "Select up to three.", 3),
          C("s1q6", "Which career areas currently interest you?", "Data analysis or business intelligence|Data science or machine learning|Data engineering or database work|Research|Applying data science in a specific industry|Still exploring|Other", "Select all that apply."),
          T("s1q7", "What do you most want to learn or accomplish during your first semester?"),
          C("s1q8", "Which resources would help you get started?", "Preparation materials or refresher exercises|Tutoring or academic support|Course-planning guidance|Software and tool setup|Career information|Classmates or a study group|University support-service information|Unsure|Other|None at this time", "Select all that apply.", 0, ["None at this time"]),
          M("s1q9", "Do you know where to find department resources and how to access department common spaces?", "Department academic/support resources|Department common spaces", "Know what is available and how to access it|Know it exists, but unsure how to access it|Unaware of what is available|Not applicable"),
          T("s1q9b", "What access information would help?", "Optional.")
        ])
      ]
    },
    "semester-short": {
      code: "S2", title: "Beginning of a Semester", version: "Short", time: "3–4 minutes",
      when: "First two weeks of each semester",
      intro: "Help us understand your plans for this semester and any support you may need to carry them out.",
      sections: [
        S("Semester plan", "Confirm your current plans.", [
          R("s2q1", "Which semester of the DSA MS program are you beginning?", "First|Second|Third|Fourth or later"),
          T("s2q2", "Which DSA courses are you taking this semester?", "List course codes or titles, or enter “Enrollment not finalized.”"),
          R("s2q3", "Are there prerequisites or foundational skills you still need to strengthen for these courses?", "Yes|No|Unsure"),
          C("s2q3b", "Which areas may need strengthening?", prepAreas, "Answer if you selected Yes or Unsure.", 0, ["None"]),
          C("s2q4", "What are your main goals for this semester?", "Strengthen foundational skills|Complete planned courses|Complete a portfolio project|Gain research experience|Explore career options|Prepare internship applications|Apply for internships|Prepare job applications|Apply for jobs|Other", "Select up to three.", 3)
        ]),
        S("Capacity and support", "Share only what you are comfortable providing.", [
          R("s2q5", "How much time can you usually reserve for coursework outside scheduled classes each week?", "Fewer than 5 hours|5–9 hours|10–14 hours|15–19 hours|20 or more hours|Unsure"),
          C("s2q6", "Are any commitments likely to affect your participation this semester?", "Paid work|Caregiving or family responsibilities|Transportation or commuting|Scheduling conflicts|Reliable computer or internet access|Other commitments|Prefer not to answer|None anticipated", "Optional; select all that apply.", 0, ["Prefer not to answer", "None anticipated"]),
          R("s2q7", "Has your career direction changed since your last profile update?", "Yes|No|I am still exploring", "", { values: ["Yes"], label: "Describe your current direction.", type: "textarea" }),
          C("s2q8", "What support would help you accomplish your semester goals?", "Academic preparation or tutoring|Course or program planning|Project or research guidance|Career exploration|Resume, portfolio, or interview preparation|Internship or job-search guidance|University support referrals|Unsure|Other|None at this time", "Select all that apply.", 0, ["None at this time"])
        ])
      ]
    },
    "advising-short": {
      code: "S3", title: "Advising Milestones", version: "Short", time: "About 3 minutes",
      when: "Before an advising meeting or important planning decision",
      intro: "Tell your adviser what you would like to address so the meeting can focus on your priorities.",
      sections: [
        S("Plan the conversation", "Share only personal context you are comfortable providing.", [
          R("s3q1", "What is the main reason for this advising update?", "Routine academic planning|Choosing or changing courses|Reviewing prerequisites|Difficulty in a course|Project or research planning|Career direction|Considering an enrollment change|Follow-up on earlier advising|Other"),
          C("s3q2", "Which topics would you like to discuss?", "Course selection or sequencing|Academic progress|Foundational skill gaps|Study strategies or academic resources|Project or research opportunities|Internship or career preparation|Commitments affecting study|University support resources|Other", "Select all that apply."),
          R("s3q3", "Is anything preventing you from following your current academic plan?", "Yes|No|Unsure", "", { values: ["Yes", "Unsure"], label: "Describe the issue, sharing only what you are comfortable providing.", type: "textarea" }),
          R("s3q4", "If you previously agreed on action items with an adviser, what is their status?", "All completed|Some completed|In progress|Not started|Need clarification|No previous action items"),
          T("s3q4b", "Which item needs discussion or support?"),
          T("s3q5", "What decision or outcome would make this advising discussion useful to you?"),
          R("s3q6", "When would you like a response or meeting?", "Within the next few business days|Within the next two weeks|At my next scheduled advising meeting|No additional meeting requested"),
          T("s3q7", "Is there anything else your adviser should know beforehand?")
        ])
      ]
    },
    "career-short": {
      code: "S4", title: "Internship or Job-Search Milestones", version: "Short", time: "3–4 minutes",
      when: "At a meaningful career-search or opportunity milestone",
      intro: "Update us on your career progress so the program can offer relevant support. Answer for your current search or opportunity.",
      sections: [
        S("Current activity", "If you are not currently pursuing an opportunity, you may skip the activity details.", [
          R("s4q1", "What are you currently pursuing?", "Internship|Full-time job|Part-time job involving data skills|Multiple opportunity types|Career exploration|Not currently pursuing an opportunity"),
          R("s4q2", "Which stage best describes your current progress?", "Exploring roles or industries|Preparing applications|Identifying opportunities|Submitting applications|Interviewing or completing assessments|Considering an offer|Accepted but not started|Started an internship or job|Paused the search"),
          T("s4q3", "Which roles or industries are you targeting?", "", 1),
          R("s4q4", "When do you hope to begin?", "Within three months|In three to six months|More than six months|Already started|Unsure"),
          C("s4q5", "Since your last career update, or since beginning this search, what steps have you completed?", "Updated resume|Updated portfolio|Sought advice or attended a career event|Contacted employers or professional connections|Submitted applications|Completed interviews or assessments|Received an offer|Accepted an offer|Started the opportunity|No steps yet", "Select all that apply.", 0, ["No steps yet"]),
          C("s4q6", "What is making progress difficult?", "Unclear direction|Finding suitable opportunities|Limited experience or portfolio|Application preparation|Interview or assessment preparation|Limited connections|Time constraints|Location or work arrangement|Eligibility requirements|Unsure|Other|No current difficulty", "Select all that apply.", 0, ["No current difficulty"])
        ]),
        S("Support", "Choose what would be useful now.", [
          C("s4q7", "What career support would be useful now?", careerSupport, "Select all that apply.", 0, ["None"]),
          R("s4q8", "Would you like faculty or adviser follow-up about your career plans?", "Yes|No", "", { values: ["Yes"], label: "What would you most like help with?", type: "textarea" })
        ])
      ]
    },
    "end-short": {
      code: "S5", title: "End-of-Semester Curriculum and Career Feedback", version: "Short", time: "14–23 minutes for three courses",
      when: "After coursework is completed, ideally after final grades",
      intro: "Help us improve curriculum, preparation resources, and career opportunities. Written responses are optional. Avoid naming classmates or sharing their personal information.",
      sections: [
        S("Course review", "Complete this section once for each course. This prototype shows one repeatable course block.", [
          T("s5q1", "Which course are you reviewing?", "Enter the course code or title.", 1),
          R("s5q2", "How well did prior knowledge prepare you?", "Not at all|Slightly|Moderately|Well|Very well"),
          R("s5q3", "Would a prerequisite or preparation requirement have helped?", "Required prerequisite course|Refresher, workshop, or module|Both|Existing requirements sufficient|No requirement needed|Unsure"),
          C("s5q3a", "If preparation was needed, which skills?", "Python|Other programming|SQL/databases|Statistics|Linear algebra|Calculus|Data cleaning|Visualization|Machine learning|Development tools|Technical communication|Other", "Select all that apply."),
          T("s5q3b", "Name a recommended course or activity.", "", 1),
          R("s5q3c", "Were these needs communicated before enrollment?", "Yes|Partly|No|Unsure"),
          C("s5q4", "How did this course connect with other courses?", "Built on earlier work|Useful reinforcement|Repetition without added depth|Assumed untaught knowledge|Better earlier|Better later|Unclear connections|Insufficient experience to judge", "Select all that apply."),
          T("s5q4b", "Identify a topic, overlapping course, or sequence change."),
          M("s5q5", "How much did this course develop each area?", "Technical knowledge|Realistic open-ended problem solving|Messy or incomplete data|Nontechnical communication|Collaboration|Responsible data practices|Independent tool learning", development),
          R("s5q6", "Did the course produce work you could show an employer?", "Ready to share|With revision|Possibly, with guidance|No|Unsure"),
          T("s5q6b", "What would make it portfolio-ready?", "Do not include restricted data or materials."),
          C("s5q7", "What would most improve its learning and career value?", "Preparation resources|Realistic data/problems|Relevant tools|Underlying concepts|Open-ended projects|Documentation/presentation guidance|Nontechnical communication|Teamwork with shared tools|Industry examples|Course coordination|Assignment/goal alignment|Other|No major changes", "Select up to three.", 3, ["No major changes"]),
          T("s5q8a", "What should the department preserve?"),
          T("s5q8b", "What should the department change?")
        ], "Repeat Questions 1–8 for each course you are reviewing."),
        S("Across the program", "Consider the semester as a whole.", [
          R("s5q9", "Were there important gaps or unnecessary overlaps this semester?", "Gaps|Overlaps|Both|Neither|Unsure"),
          T("s5q9b", "Identify topics and courses; distinguish useful reinforcement from repetition."),
          R("s5q10", "How manageable was major-assignment timing across courses?", "Consistently manageable|Usually manageable|Occasionally difficult due to clustering|Frequently difficult due to clustering|Took one course"),
          T("s5q10b", "Suggest a coordination change."),
          C("s5q11", "Which areas need more attention for your career goals?", "Programming/software practices|SQL/data engineering|Statistics/experimental design|Machine learning/evaluation|Real-world data|Visualization/communication|Deployment|Responsible AI/privacy/ethics|Domain knowledge|Teamwork|Portfolio|Career exploration/employer connections|Other|Unsure|No additional areas", "Select up to three.", 3, ["No additional areas"]),
          C("s5q12", "Have you applied this semester’s learning outside class?", "Internship|Paid work|Research|Personal project|Community project|Interview/assessment|Other|No opportunity", "Select all that apply.", 0, ["No opportunity"]),
          T("s5q12b", "What was useful, and what preparation was missing?"),
          C("s5q13", "What would better connect coursework to careers?", "External projects|Employer/alumni connections|Skill-to-role explanations|Portfolio guidance|Interview/assessment practice|Opportunity access|Research/applied projects|Elective guidance|Other|Unsure|Current opportunities sufficient", "Select up to three.", 3, ["Current opportunities sufficient"])
        ]),
        S("Resources and spaces", "Replace the resource categories with faculty-confirmed names before live use.", [
          M("s5q14", "Resource awareness and use", "Advising|Office hours|Tutoring or preparation|Career guidance|Projects or research|Peer learning|Computing or software", "Unaware it existed|Aware, but unsure how to access it|Know how to access it, but have not used it|Used it this semester"),
          C("s5q15", "If you did not use a resource, why?", "No need|Hours conflict|Unsure whether eligible|Unsure how it would help|Access difficulty|Other|Prefer not to answer", "Select all that apply."),
          R("s5q16", "How often did you use department common spaces this semester?", "Never|Less than monthly|Monthly|Weekly|Several times a week|Unaware of available spaces|No department common spaces available|Prefer not to answer"),
          C("s5q17", "What did you use these spaces for?", "Individual study|Group coursework|Meeting classmates|Informal help or discussion|Department events|Other", "Answer if you used them."),
          C("s5q18", "What would make these spaces more useful or accessible?", "Clearer access information|Different hours|More suitable seating or equipment|Quiet study options|Group-work options|Organized activities|Other|Unsure|No changes needed", "Select all that apply.", 0, ["No changes needed"]),
          T("s5q19", "What single change would be most valuable for future students?"),
          R("s5q20", "Would you like to discuss curriculum feedback or request individual support?", "Yes — use a separate follow-up form|No", "This evaluation prototype does not collect contact details.")
        ])
      ]
    },
    "program-long": {
      code: "L1", title: "Beginning of the Program", version: "Expanded", time: "13–16 minutes",
      when: "Once, during the first two weeks",
      intro: "Your responses will help the DSA MS program understand your starting point and provide relevant academic and career support. You may skip optional questions.",
      sections: [
        S("Background", "Tell us about relevant preparation and experience.", [
          T("l1q1", "What was your primary undergraduate field of study?", "", 1),
          R("l1q2", "Have you completed other relevant degrees, certificates, or substantial training?", "Yes|No", "", { values: ["Yes"], label: "Describe the subject and type.", type: "textarea" }),
          C("l1q3", "What relevant experience do you bring?", "Data-analysis coursework|Data or technology employment|Internship|Research|Personal projects|Community projects|No experience|Other", "Select all that apply.", 0, ["No experience"]),
          T("l1q3b", "Describe one experience that represents your abilities.")
        ]),
        S("Preparation", "Self-ratings are not skills tests.", [
          M("l1q4", "Rate your experience in each area.", "Python|SQL/databases|Statistics/probability|Linear algebra|Calculus|Data cleaning/analysis|Visualization|Machine learning|Git/version control|Command line/development environments|Technical communication", "No experience|Some exposure|Basic tasks independently|Advanced tasks independently|Unsure"),
          C("l1q5", "Which activities have you completed?", "Data-processing program|SQL query|Cleaning missing/inconsistent data|Statistical analysis|Training/evaluating a model|Communicating through visualization|Team project with shared tools|Explaining findings to a nontechnical audience|None", "Select all that apply.", 0, ["None"]),
          R("l1q6", "Have you been assigned prerequisites or preparation activities?", "Yes|No|Unsure"),
          T("l1q6b", "If yes, list each course or activity, status, and whether help is needed."),
          C("l1q7", "Which subjects need additional preparation?", "Python|SQL/databases|Statistics/probability|Linear algebra|Calculus|Data cleaning/analysis|Visualization|Machine learning|Git/version control|Development environments|Technical communication|None|Unsure", "Select all that apply.", 0, ["None"]),
          C("l1q8", "Which preparation formats would help?", "Tutorials|Workshops|Exercises with solutions|Tutoring|Peer groups|Prerequisite course|Faculty office hours|Unsure|Other", "Select all that apply.")
        ]),
        S("Goals and expectations", "Choose the outcomes that matter most to you.", [
          C("l1q9", "What are your main reasons for the degree?", "Enter a data career|Advance my career|Change careers|Doctoral study or research|Apply data in another field|Build technical expertise|Explore careers|Other", "Select up to three.", 3),
          C("l1q10", "Which roles interest you?", "Data analyst|Business intelligence analyst|Data scientist|Machine-learning engineer|Data engineer|Database role|Research|Other|Still exploring", "Select all that apply."),
          T("l1q11", "Which industries or application areas interest you?", "", 1),
          C("l1q12", "What should the program help you develop?", "Mathematics/statistics|Programming|Data management|Machine learning|Realistic problem experience|Research|Portfolio|Communication|Teamwork|Professional connections|Internship opportunities|Career/job-search skills", "Select up to five.", 5),
          T("l1q13", "What would make your first year successful?"),
          R("l1q14", "Are requirements, sequencing, or career possibilities unclear?", "Yes|No|Unsure"),
          T("l1q14b", "What needs clarification?")
        ]),
        S("Access and support", "Personal circumstances are optional.", [
          M("l1q15", "Do you have reliable access to needed resources?", "Suitable computer|Internet|Software/computing environments|Study space|Reserved coursework time", "Yes|Sometimes|No|Unsure"),
          C("l1q16", "What circumstances should the program consider in planning?", "Employment|Caregiving|Commuting|Scheduling|Financial constraints|Technology access|Other|Prefer not to answer|None", "Optional; select all that apply.", 0, ["Prefer not to answer", "None"]),
          C("l1q17", "What support would help?", "Preparation|Course planning|Software setup|Study strategies|Peer connections|Career exploration|University resources|Other|None", "Select all that apply.", 0, ["None"]),
          R("l1q18", "Would you like follow-up?", "Yes|No"),
          T("l1q18b", "If yes, what topic?"),
          M("l1q19", "Do you know where to find department resources and access common spaces?", "Department academic/support resources|Department common spaces", "Know what is available and how to access it|Know it exists, but unsure how to access it|Unaware of what is available|Not applicable"),
          T("l1q19b", "What access information would help?")
        ])
      ]
    },
    "semester-long": {
      code: "L2", title: "Beginning of a Semester", version: "Expanded", time: "10–15 minutes for three courses",
      when: "First two weeks, when a fuller planning review is useful",
      intro: "Help us understand your plans and what could help you succeed. Confirm any prefilled information and update what has changed.",
      sections: [
        S("Semester plan", "Start with your overall schedule.", [
          R("l2q1", "Which semester are you beginning?", "First|Second|Third|Fourth or later"),
          T("l2q2", "Which courses are you taking?", "List course codes or titles, or enter “Enrollment not finalized.”"),
          R("l2q3", "How clear is each course’s place in your program plan?", "Very unclear|Somewhat unclear|Neither unclear nor clear|Somewhat clear|Very clear"),
          C("l2q4", "Do you have concerns about the sequence?", "Needed course unavailable|Schedule conflict|Unsure what comes next|Taking a course before prepared|Repeated content|Elective guidance needed|Other|None", "Select all that apply.", 0, ["None"])
        ]),
        S("Preparation by course", "Repeat this block for each course.", [
          T("l2q5course", "Which course are you reviewing?", "", 1),
          R("l2q5", "How prepared are you for its expected starting knowledge?", "Not at all|Slightly|Moderately|Well|Very well|Unsure what is expected"),
          C("l2q6", "Which areas need review?", "Programming|SQL/databases|Statistics|Linear algebra/calculus|Data cleaning|Machine learning|Development tools|Technical communication|Other|Unsure|None", "Select all that apply.", 0, ["None"]),
          R("l2q7", "Were expected skills and prerequisites clear before enrollment?", "Yes|Partly|No|Did not review them"),
          C("l2q8", "What preparation would help?", "Expected-skill list|Refreshers|Exercises|Workshop|Tutoring or study group|Instructor/adviser discussion|Other|None", "Select all that apply.", 0, ["None"])
        ], "Repeat Questions 5–8 for each course."),
        S("Goals and progress", "Reflect on priorities and earlier plans.", [
          C("l2q9", "What are your three highest priorities?", "Courses|Foundations|Portfolio|Research|Teamwork/communication|Career exploration|Internship preparation|Internship applications|Job preparation|Job applications|Other", "Select up to three.", 3),
          T("l2q10", "How are you progressing on previous goals?", "For each saved goal, note: Completed, Partly completed, In progress, Not started, or No longer relevant. You may add what helped or prevented progress."),
          R("l2q11", "Are you planning an applied experience this semester?", "Yes|No|Exploring"),
          T("l2q11b", "If applicable, describe the activity, desired skills, and help needed."),
          R("l2q12", "Has your career direction changed?", "Yes|No|Still exploring"),
          T("l2q12b", "If applicable, list updated roles or industries.")
        ]),
        S("Time and support", "Share only what you are comfortable providing.", [
          R("l2q13", "How many hours can you reserve for coursework outside class each week?", "Fewer than 5|5–9|10–14|15–19|20–24|25 or more|Unsure"),
          C("l2q14", "Which circumstances may affect your plans?", "Employment|Caregiving|Commuting|Scheduling|Technology|Finances|Other|Prefer not to answer|None", "Optional; select all that apply.", 0, ["Prefer not to answer", "None"]),
          R("l2q15", "Do you have required software, equipment, and access?", "Yes|Partly|No|Unsure"),
          T("l2q15b", "What is missing?"),
          C("l2q16", "Which support would be useful?", "Preparation/tutoring|Course planning|Projects/research|Career planning|Portfolio|Internship/job search|Study strategies|Referrals|Other|None", "Select all that apply.", 0, ["None"]),
          T("l2q17", "What decision or concern should an adviser address early?"),
          R("l2q18", "Would you like follow-up?", "Yes|No")
        ])
      ]
    },
    "advising-long": {
      code: "L3", title: "Advising Milestones", version: "Expanded", time: "8–12 minutes before; 3–5 minutes after",
      when: "Before and after an advising discussion",
      intro: "Tell your adviser what to address and what progress you have made. Share only personal context you are comfortable providing.",
      sections: [
        S("Before the discussion", "Prepare priorities and decisions.", [
          C("l3q1", "What prompted this update?", "Academic planning|Course selection|Prerequisites|Course difficulty|Project/research|Career planning|Internship planning|Enrollment change|Earlier-discussion follow-up|Other", "Select all that apply."),
          T("l3q2", "What is your most important priority?", "", 1),
          C("l3q3", "Which decisions need help?", "Courses/electives|Course load|Preparation gaps|Academic progress|Project/research direction|Career connections|Internship fit|Continuing, pausing, or changing enrollment|Other|None", "Select all that apply.", 0, ["None"]),
          R("l3q4", "Is your academic plan achievable now?", "Yes|Partly|No|Unsure"),
          T("l3q4b", "What needs adjustment?"),
          C("l3q5", "What barriers are affecting progress?", "Foundations|Course material|Unclear requirements|Availability/sequencing|Time|Technology|Opportunity access|Personal circumstances to discuss privately|Other|None", "Select all that apply.", 0, ["None"]),
          C("l3q6", "Which resources have you already tried?", "Instructor office hours|Adviser|Tutoring|Study group|Tutorials/practice|Career services|University services|Other|None", "Select all that apply.", 0, ["None"]),
          T("l3q6b", "What helped, and what remains unresolved?")
        ]),
        S("Earlier actions", "Review continuity from previous advising.", [
          R("l3q7", "Were action items agreed previously?", "Yes|No|Unsure|No previous discussion"),
          T("l3q7b", "If yes, list each action, its status, whether it was clear, any obstacle, and whether further help is needed."),
          R("l3q8", "Did previous advising help you move forward?", "Not at all|A little|Somewhat|Quite a bit|A great deal|Not applicable"),
          T("l3q8b", "What was useful or missing?")
        ]),
        S("Desired outcome", "Define what a useful discussion looks like.", [
          C("l3q9", "What would make this discussion successful?", "Course plan|Skill-development plan|Referral|Project/research step|Career direction|Barrier-resolution plan|Requirements clarification|Other", "Select all that apply."),
          R("l3q10", "When would you like a response?", "Within a few business days|Within two weeks|At the next scheduled meeting|No extra meeting"),
          T("l3q11", "Is there anything else your adviser should know?")
        ]),
        S("After the discussion", "Complete this section after your meeting.", [
          R("l3q12", "Were your main questions addressed?", "Fully|Mostly|Partly|Not at all"),
          R("l3q13", "How clear are your next steps?", "Very unclear|Somewhat unclear|Neither unclear nor clear|Somewhat clear|Very clear"),
          R("l3q14", "Were the next steps realistic?", "Yes|Partly|No|No actions agreed"),
          R("l3q15", "Is anything unresolved?", "Yes|No"),
          T("l3q15b", "If yes, describe what remains unresolved."),
          C("l3q16", "What could improve advising?", "Scheduling|Pre-meeting information|Continuity|Course guidance|Career guidance|Clear actions|Follow-up|Referrals|Other|No change needed", "Select all that apply.", 0, ["No change needed"])
        ])
      ]
    },
    "career-long": {
      code: "L4", title: "Internship or Job-Search Milestones", version: "Expanded", time: "10–15 minutes",
      when: "At meaningful career changes while enrolled",
      intro: "Update your career activity to help the program support you and understand how coursework prepares students for opportunities.",
      sections: [
        S("Goals and stage", "Describe your current direction.", [
          R("l4q1", "What are you pursuing?", "Internship|Full-time job|Part-time data work|Multiple types|Exploration|Not pursuing"),
          R("l4q2", "What is your current stage?", "Exploring|Preparing materials|Identifying openings|Applying|Interviews/assessments|Considering an offer|Accepted, not started|Started|Paused"),
          T("l4q3a", "Which roles are you targeting?", "", 1),
          T("l4q3b", "Which industries are you targeting?", "", 1),
          R("l4q4", "When do you want to start?", "Within three months|Three to six months|More than six months|Already started|Unsure"),
          C("l4q5", "Which requirements affect opportunities?", "Location|Work arrangement|Schedule|Compensation|Duration|Eligibility|Coursework compatibility|Other|Prefer not to answer|None", "Optional; select all that apply.", 0, ["Prefer not to answer", "None"])
        ]),
        S("Past 30 days", "Counts describe activity, not student quality.", [
          R("l4q6", "How many applications did you submit?", "0|1–5|6–10|11–20|More than 20|Unsure"),
          R("l4q7", "How many employers interviewed you or gave you assessments?", "0|1–2|3–5|More than 5|Unsure"),
          R("l4q8", "How many offers did you receive?", "0|1|2 or more|Prefer not to answer"),
          C("l4q9", "Which opportunity or contact sources were useful?", "Faculty/staff|Career services|Classmates/alumni|Events|Networking|Job boards|Employer websites|Prior employers|Other|None yet", "Select all that apply.", 0, ["None yet"])
        ]),
        S("Skills and obstacles", "Do not share confidential assessment content.", [
          C("l4q10", "Which skills have employers requested?", "Python|SQL|Statistics|Machine learning|Data cleaning|Visualization/BI|Engineering/cloud|Software practices|Communication|Teamwork|Domain knowledge|Other|Not reached this stage", "Select all that apply.", 0, ["Not reached this stage"]),
          R("l4q11", "How well has coursework prepared you for encountered requirements?", "Not at all|Slightly|Moderately|Well|Very well|Insufficient experience"),
          T("l4q11b", "Describe one strength and one gap."),
          T("l4q12", "Which course, project, or assignment was most useful, and why?"),
          C("l4q13", "What obstacles are you encountering?", "Direction|Openings|Experience|Portfolio|Applications|Assessments|Interviews|Connections|Time|Location/work arrangement|Eligibility|Little feedback|Other|None", "Select all that apply.", 0, ["None"]),
          T("l4q14", "What employer feedback could improve preparation?", "Summarize without naming interviewers or sharing confidential content.")
        ]),
        S("Support", "Choose what would help next.", [
          C("l4q15", "What support would be useful?", "Direction|Listings|Resume|Portfolio|Interviews|Assessments|Networking|Offers|Internship/coursework planning|Other|None", "Select all that apply.", 0, ["None"]),
          T("l4q16", "What is your next planned career step?"),
          R("l4q17", "Would you like faculty or adviser follow-up?", "Yes|No")
        ]),
        S("Accepted or started opportunity", "Complete only if you accepted or started an opportunity.", [
          R("l4q18", "What is the opportunity type?", "Internship|Full-time|Part-time|Other"),
          T("l4q19a", "What is the role title?", "Employer name is not required.", 1),
          T("l4q19b", "What is the industry?", "", 1),
          R("l4q20", "How closely does it relate to DSA learning or goals?", "Not at all|Slightly|Moderately|Closely|Very closely|Unsure"),
          C("l4q21", "If started, which skills have you used?", "Python|SQL|Statistics|Machine learning|Data cleaning|Visualization/BI|Engineering/cloud|Software practices|Communication|Teamwork|Domain knowledge|Other|Not started|None yet", "Select all that apply.", 0, ["Not started", "None yet"]),
          T("l4q22", "What would have made you better prepared?"),
          T("l4q23", "How could the department support similar opportunities?")
        ])
      ]
    },
    "end-long": {
      code: "L5", title: "End-of-Semester Curriculum and Career Feedback", version: "Expanded", time: "27–38 minutes for three courses",
      when: "After coursework, ideally after grades",
      intro: "Explain how courses fit together and support your development. Written comments are optional; avoid naming classmates or sharing their information.",
      sections: [
        S("Course review", "Complete Questions 1–13 once for each course.", [
          T("l5q1", "Which course are you reviewing?", "Enter course code or title.", 1),
          R("l5q2", "How well did prior knowledge prepare you?", "Not at all|Slightly|Moderately|Well|Very well"),
          C("l5q3", "Which necessary starting skills were insufficiently developed?", "Programming|SQL/databases|Statistics|Linear algebra|Calculus|Cleaning/analysis|Machine learning|Development tools|Technical communication|Other|No substantial gaps", "Select all that apply.", 0, ["No substantial gaps"]),
          R("l5q4", "Would different preparation requirements have helped?", "Prerequisite course|Refresher module|Both|Clearer expected skills|Existing requirements sufficient|No requirement needed|Unsure"),
          T("l5q4b", "If you suggest a change, describe prior content, a course/activity, and when the gap became apparent."),
          R("l5q5", "If you completed listed prerequisites, did they prepare you adequately?", "Fully|Mostly|Partly|Not at all|Did not complete|None listed|Unsure"),
          T("l5q5b", "What was missing?"),
          C("l5q6", "How did this course connect to the curriculum?", "Built on earlier work|Useful reinforcement|Repetition without depth|Assumed untaught material|Unclear connections|Better earlier|Better later|Insufficient experience", "Select all that apply."),
          T("l5q6b", "Name related courses/topics and a suggested change."),
          R("l5q7", "How appropriate was the depth of coverage?", "Too introductory|Somewhat introductory|Appropriate|Somewhat advanced|Too advanced|Varied by topic"),
          T("l5q7b", "Which topics need more or less depth?"),
          R("l5q8", "How well did assignments demonstrate learning goals?", "Not at all|Slightly|Moderately|Well|Very well|Unsure"),
          T("l5q8b", "Describe a mismatch or effective assignment."),
          T("l5q9", "Which tools or methods did you use meaningfully?", "Distinguish substantive use from demonstrations."),
          M("l5q10", "How much did the course develop each area?", "Technical knowledge|Open-ended problem solving|Messy data|Method selection/evaluation|Reproducibility|Documenting decisions|Nontechnical communication|Collaboration|Ethics/privacy/limitations|Independent tool learning", development),
          R("l5q11", "How closely did assignments resemble employment or research problems?", "Not at all|Slightly|Moderately|Closely|Very closely|Unsure"),
          T("l5q11b", "How could assignments be more realistic?"),
          R("l5q12", "Did you produce evidence of your skills?", "Ready to share|With revision|Possibly with guidance|No|Unsure"),
          T("l5q12b", "What help would make it portfolio-ready?"),
          T("l5q13a", "What should be preserved?"),
          T("l5q13b", "What should change?"),
          T("l5q13c", "What is the highest-priority change and expected benefit?")
        ], "Repeat Questions 1–13 for every course reviewed."),
        S("Curriculum across courses", "Consider connections, sequence, and coverage.", [
          T("l5q14", "Were there important gaps or unnecessary duplication?", "Name topics/courses and distinguish reinforcement from repetition."),
          R("l5q15", "Would you change the course or topic sequence?", "Yes|No|Unsure"),
          T("l5q15b", "If yes, describe the proposed sequence and reason."),
          R("l5q16", "How manageable was combined assignment timing?", "Consistently manageable|Usually manageable|Occasionally difficult due to clustering|Frequently difficult due to clustering|One course"),
          T("l5q16b", "Suggest a coordination improvement."),
          C("l5q17", "Which areas need attention?", "Programming/software|Databases/engineering|Statistics/design|Machine learning/evaluation|Real-world data|Communication|Deployment|Responsible AI/privacy/ethics|Domain knowledge|Teamwork/project management|Research methods|Portfolio|Career preparation|Other|Unsure|None", "Select up to five.", 5, ["None"]),
          T("l5q18", "Which electives or applied experiences would you like?", "Connect suggestions to your goals.")
        ]),
        S("Application outside class", "Reflect on use beyond coursework.", [
          C("l5q19", "Did you apply learning outside class?", "Internship|Employment|Research|Personal project|Community work|Interview/assessment|Other|No opportunity", "Select all that apply.", 0, ["No opportunity"]),
          T("l5q19b", "If applicable, describe useful learning, missing skills, and a course/activity that could address the gap."),
          R("l5q20", "How much did the semester clarify suitable career roles?", "Not at all|A little|Somewhat|Quite a bit|A great deal"),
          C("l5q21", "What would better connect coursework to careers?", "External projects|Employer/alumni participation|Skill-to-role links|Portfolio|Interview/assessment practice|Opportunities|Research/applied projects|Career-oriented elective pathways|Other|Unsure|Current connections sufficient", "Select up to three.", 3, ["Current connections sufficient"])
        ]),
        S("Department priorities", "Use faculty-confirmed resource names before live administration.", [
          M("l5q22", "How helpful were resources you used?", "Advising|Office hours|Tutoring/preparation|Career guidance|Projects/research|Peer learning|Computing/software", "Not helpful|Slightly helpful|Moderately helpful|Very helpful|Unable to judge"),
          M("l5q23", "Resource awareness and use", "Advising|Office hours|Tutoring/preparation|Career guidance|Projects/research|Peer learning|Computing/software", "Unaware it existed|Aware, but unsure how to access it|Know how to access it, but have not used it|Used it this semester"),
          C("l5q24", "If you did not use a resource, why?", "No need|Hours conflict|Unsure whether eligible|Unsure how it would help|Access difficulty|Other|Prefer not to answer", "Select all that apply."),
          R("l5q25", "How often did you use department common spaces?", "Never|Less than monthly|Monthly|Weekly|Several times a week|Unaware of available spaces|No department common spaces available|Prefer not to answer"),
          C("l5q26", "What did you use these spaces for?", "Individual study|Group coursework|Meeting classmates|Informal help or discussion|Department events|Other", "Answer if used."),
          C("l5q27", "What would make spaces more useful or accessible?", "Clearer access information|Different hours|More suitable seating or equipment|Quiet study options|Group-work options|Organized activities|Other|Unsure|No changes needed", "Select all that apply.", 0, ["No changes needed"]),
          T("l5q28", "Was support needed but inaccessible?"),
          T("l5q29", "What single change would be most valuable for future students?"),
          T("l5q30", "What is one departmental strength to preserve?"),
          R("l5q31", "Would you like to discuss curriculum feedback or request individual support?", "Yes — use a separate follow-up form|No", "This evaluation prototype does not collect contact details.")
        ])
      ]
    }
  };

  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const form = document.querySelector("[data-survey]");
  if (!form) return;

  const survey = surveys[form.dataset.survey];
  if (!survey) {
    form.innerHTML = "<p>Survey configuration not found.</p>";
    return;
  }

  document.title = `${survey.title} — ${survey.version} prototype`;
  const hero = document.querySelector("[data-survey-hero]");
  hero.innerHTML = `
    <p class="eyebrow">${esc(survey.code)} · ${esc(survey.version)} instrument</p>
    <h1>${esc(survey.title)}</h1>
    <p class="hero__lede">${esc(survey.intro)}</p>
    <div class="survey-meta">
      <span class="meta-chip">Estimated ${esc(survey.time)}</span>
      <span class="meta-chip">${esc(survey.when)}</span>
      <span class="meta-chip">Optional prototype responses</span>
    </div>
    <div class="notice" role="note">
      <span class="notice__mark" aria-hidden="true">i</span>
      <div><strong>Private prototype — nothing is sent or saved.</strong>
      <p>Answers stay only in this browser tab’s temporary memory. Closing or refreshing the page discards them. Review and reset are local-only.</p></div>
    </div>`;

  const fieldIndex = new Map();
  let questionNumber = 0;
  const sectionsHTML = survey.sections.map((section, sectionIndex) => {
    const sectionId = `section-${sectionIndex + 1}-${slug(section.title)}`;
    const questions = section.questions.map(q => {
      questionNumber += 1;
      fieldIndex.set(q.id, { ...q, number: questionNumber });
      return renderQuestion(q, questionNumber);
    }).join("");
    return `<section class="survey-section" id="${sectionId}" aria-labelledby="${sectionId}-title">
      <p class="section-kicker">Section ${sectionIndex + 1} of ${survey.sections.length}</p>
      <h2 id="${sectionId}-title">${esc(section.title)}</h2>
      <p class="section-note">${esc(section.note)}</p>
      ${section.repeat ? `<div class="repeat-banner"><strong>Course-by-course:</strong> ${esc(section.repeat)} In this review prototype, use the block once to assess its wording and flow.</div>` : ""}
      ${questions}
    </section>`;
  }).join("");

  const nav = survey.sections.map((section, i) => `<a href="#section-${i + 1}-${slug(section.title)}">${i + 1}. ${esc(section.title)}</a>`).join("");
  form.innerHTML = `
    <div class="progress-wrap" aria-label="Survey completion">
      <div class="progress-label"><span>Prototype completion</span><span data-progress-text>0% answered</span></div>
      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress__bar"></div></div>
    </div>
    <nav class="section-nav" aria-label="Survey sections">${nav}</nav>
    ${sectionsHTML}
    <div class="actions">
      <span class="privacy-line">Local preview only · no submission exists</span>
      <div class="actions__group">
        <button type="button" class="quiet" data-reset>Reset locally</button>
        <button type="button" class="secondary" data-print>Print blank/copy</button>
        <button type="button" data-review>Review answers</button>
      </div>
    </div>`;

  function renderQuestion(q, number) {
    const hint = q.hint ? `<span class="hint" id="${q.id}-hint">${esc(q.hint)}</span>` : "";
    const described = q.hint ? ` aria-describedby="${q.id}-hint"` : "";
    const label = `<span class="q-number">${number}.</span>${esc(q.label)} ${q.optional ? '<span class="optional">(optional)</span>' : ""}`;
    let control = "";
    if (q.type === "radio" || q.type === "check") {
      const inputType = q.type === "radio" ? "radio" : "checkbox";
      control = `<div class="choice-list">${q.options.map((option, i) => `<label class="choice"><input type="${inputType}" name="${q.id}" value="${esc(option)}" data-question="${q.id}" ${described}><span>${esc(option)}</span></label>`).join("")}</div><p class="validation" id="${q.id}-error" hidden></p>`;
    } else if (q.type === "matrix") {
      control = `<div class="matrix-wrap"><table><thead><tr><th scope="col">Area</th>${q.columns.map(c => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${q.rows.map((row, ri) => `<tr><th scope="row">${esc(row)}</th>${q.columns.map(col => `<td><input type="radio" name="${q.id}-${ri}" value="${esc(col)}" data-question="${q.id}" data-row="${esc(row)}" aria-label="${esc(row)}: ${esc(col)}"></td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    } else {
      const tag = q.type === "textarea"
        ? `<textarea id="${q.id}" name="${q.id}" data-question="${q.id}" ${described}></textarea>`
        : `<input type="text" id="${q.id}" name="${q.id}" data-question="${q.id}" ${described}>`;
      control = tag;
    }
    const follow = q.follow ? `<div class="conditional" data-follow-for="${q.id}" hidden><label class="question-label" for="${q.id}-follow">${esc(q.follow.label)} <span class="optional">(optional)</span></label>${q.follow.type === "textarea" ? `<textarea id="${q.id}-follow" data-question="${q.id}-follow"></textarea>` : `<input type="text" id="${q.id}-follow" data-question="${q.id}-follow">`}</div>` : "";
    if (["radio", "check", "matrix"].includes(q.type)) return `<fieldset class="question" data-field="${q.id}"><legend>${label}</legend>${hint}${control}${follow}</fieldset>`;
    return `<div class="question" data-field="${q.id}"><label class="question-label" for="${q.id}">${label}</label>${hint}${control}</div>`;
  }

  const allControls = [...form.querySelectorAll("input, textarea, select")];

  function valuesFor(id) {
    const q = fieldIndex.get(id);
    if (!q) return [];
    if (q.type === "matrix") {
      return q.rows.map((row, ri) => {
        const checked = form.querySelector(`[name="${id}-${ri}"]:checked`);
        return checked ? `${row}: ${checked.value}` : "";
      }).filter(Boolean);
    }
    const controls = [...form.querySelectorAll(`[name="${id}"]`)];
    if (q.type === "radio") return controls.filter(c => c.checked).map(c => c.value);
    if (q.type === "check") return controls.filter(c => c.checked).map(c => c.value);
    const control = form.querySelector(`[name="${id}"]`);
    return control && control.value.trim() ? [control.value.trim()] : [];
  }

  function enforceChecks(target) {
    if (target.type !== "checkbox") return;
    const q = fieldIndex.get(target.dataset.question);
    if (!q) return;
    const boxes = [...form.querySelectorAll(`[name="${q.id}"]`)];
    if (target.checked && q.exclusive.includes(target.value)) boxes.forEach(box => { if (box !== target) box.checked = false; });
    if (target.checked && !q.exclusive.includes(target.value)) boxes.forEach(box => { if (q.exclusive.includes(box.value)) box.checked = false; });
    const checked = boxes.filter(box => box.checked);
    const error = document.getElementById(`${q.id}-error`);
    if (q.max && checked.length > q.max) {
      target.checked = false;
      error.textContent = `Choose no more than ${q.max}.`;
      error.hidden = false;
      target.focus();
    } else {
      error.hidden = true;
    }
  }

  function updateFollow(target) {
    const q = fieldIndex.get(target.dataset.question);
    if (!q || !q.follow) return;
    const panel = form.querySelector(`[data-follow-for="${q.id}"]`);
    panel.hidden = !valuesFor(q.id).some(value => q.follow.values.includes(value));
    if (panel.hidden) panel.querySelectorAll("input,textarea").forEach(control => { control.value = ""; });
  }

  function updateProgress() {
    const answered = [...fieldIndex.keys()].filter(id => valuesFor(id).length > 0).length;
    const percent = Math.round((answered / fieldIndex.size) * 100);
    form.querySelector(".progress__bar").style.width = `${percent}%`;
    form.querySelector(".progress").setAttribute("aria-valuenow", String(percent));
    form.querySelector("[data-progress-text]").textContent = `${percent}% answered`;
  }

  form.addEventListener("input", event => {
    enforceChecks(event.target);
    updateFollow(event.target);
    updateProgress();
  });
  form.addEventListener("submit", event => event.preventDefault());
  form.querySelector("[data-print]").addEventListener("click", () => window.print());
  form.querySelector("[data-reset]").addEventListener("click", () => {
    if (!window.confirm("Clear all answers in this tab? Nothing has been saved.")) return;
    allControls.forEach(control => {
      if (control.type === "radio" || control.type === "checkbox") control.checked = false;
      else control.value = "";
    });
    form.querySelectorAll("[data-follow-for]").forEach(panel => { panel.hidden = true; });
    form.querySelectorAll(".validation").forEach(message => { message.hidden = true; });
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const dialog = document.querySelector("[data-review-dialog]");
  form.querySelector("[data-review]").addEventListener("click", () => {
    const entries = [];
    fieldIndex.forEach((q, id) => {
      const values = valuesFor(id);
      if (values.length) entries.push(`<dt>${q.number}. ${esc(q.label)}</dt><dd>${values.map(esc).join("<br>")}</dd>`);
      const followControl = document.getElementById(`${id}-follow`);
      if (followControl && followControl.value.trim()) entries.push(`<dt>Follow-up</dt><dd>${esc(followControl.value.trim())}</dd>`);
    });
    dialog.querySelector("[data-review-body]").innerHTML = entries.length ? `<dl>${entries.join("")}</dl>` : `<p class="empty-review">No answers yet. Return to the form to try the prototype.</p>`;
    dialog.showModal();
  });
  dialog.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  updateProgress();
})();
