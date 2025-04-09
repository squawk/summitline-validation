CREATE TABLE IF NOT EXISTS "Competency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO Competency VALUES('82fc7a71-e79e-482e-9349-c8b897a7903c','Safety Program Management','The ability to develop, implement, and maintain comprehensive safety programs, policies, and procedures in compliance with local, state, and federal regulations, including OSHA and DOT standards.');
INSERT INTO Competency VALUES('d21be1a6-75a5-4113-9c24-2e108941e81a','Incident Management and Investigation','The ability to respond to, investigate, and analyze safety incidents, implement corrective actions, and develop preventive measures to enhance overall safety performance.');
INSERT INTO Competency VALUES('44830175-a789-424a-8b47-973bbe64ea9e','Compliance and Inspections','The ability to conduct thorough safety inspections, ensure compliance with regulatory standards, and implement corrective measures to maintain a safe work environment.');
INSERT INTO Competency VALUES('4e9c8e52-badc-4b52-8561-9e8aeb35c027','Safety Data Analysis and Reporting','The ability to collect, analyze, and interpret safety data to generate meaningful insights, create comprehensive reports, and drive data-informed decision-making in safety management.');
INSERT INTO Competency VALUES('3303e801-70aa-4851-9f18-ffb68dd6ba8d','Safety Communication and Culture','The ability to effectively communicate safety information, foster a positive safety culture, and promote employee engagement in safety initiatives.');
CREATE TABLE IF NOT EXISTS "CompetencyLevel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competency_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "CompetencyLevel_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO CompetencyLevel VALUES('5f396402-d194-43dc-a368-e1bc89130012','82fc7a71-e79e-482e-9349-c8b897a7903c',1,'Novice');
INSERT INTO CompetencyLevel VALUES('008a96c5-15ed-47f5-a63e-755d52b16ce6','82fc7a71-e79e-482e-9349-c8b897a7903c',2,'Learner');
INSERT INTO CompetencyLevel VALUES('94ecb7a7-f48d-47b4-badd-4f63e8a83901','82fc7a71-e79e-482e-9349-c8b897a7903c',3,'Professional');
INSERT INTO CompetencyLevel VALUES('1bacd81e-3e13-4874-aef4-cdf315b40ab7','82fc7a71-e79e-482e-9349-c8b897a7903c',4,'Role Model/Coach');
INSERT INTO CompetencyLevel VALUES('103b6305-328c-4a88-a054-05ecf6c84458','82fc7a71-e79e-482e-9349-c8b897a7903c',5,'Expert');
INSERT INTO CompetencyLevel VALUES('5165029e-2523-49ba-8eed-95c55a5b48d5','d21be1a6-75a5-4113-9c24-2e108941e81a',1,'Novice');
INSERT INTO CompetencyLevel VALUES('f754c71b-2032-4d3e-a86b-61deaad2576a','d21be1a6-75a5-4113-9c24-2e108941e81a',2,'Learner');
INSERT INTO CompetencyLevel VALUES('856bbe73-97ef-4638-9f84-f1d7f5396cc8','d21be1a6-75a5-4113-9c24-2e108941e81a',3,'Professional');
INSERT INTO CompetencyLevel VALUES('667240c0-44f8-4b22-875b-8ace8a80fc56','d21be1a6-75a5-4113-9c24-2e108941e81a',4,'Role Model/Coach');
INSERT INTO CompetencyLevel VALUES('141a5ebb-536e-4a82-ab56-7a4c64180c6b','d21be1a6-75a5-4113-9c24-2e108941e81a',5,'Expert');
INSERT INTO CompetencyLevel VALUES('99d2ac52-5b8c-42ca-874e-0ceb0338bb71','44830175-a789-424a-8b47-973bbe64ea9e',1,'Novice');
INSERT INTO CompetencyLevel VALUES('5f8f8974-ed83-45da-90e0-340da3c8e597','44830175-a789-424a-8b47-973bbe64ea9e',2,'Learner');
INSERT INTO CompetencyLevel VALUES('a83b1777-910c-44a3-a14b-85003500877a','44830175-a789-424a-8b47-973bbe64ea9e',3,'Professional');
INSERT INTO CompetencyLevel VALUES('c4c095c6-f696-469f-86bf-117e763ab548','44830175-a789-424a-8b47-973bbe64ea9e',4,'Role Model/Coach');
INSERT INTO CompetencyLevel VALUES('3bce0c23-1806-4313-a6ed-742d473f3a77','44830175-a789-424a-8b47-973bbe64ea9e',5,'Expert');
INSERT INTO CompetencyLevel VALUES('85e0fe3d-2384-4757-a3e4-30a96abf7023','4e9c8e52-badc-4b52-8561-9e8aeb35c027',1,'Novice');
INSERT INTO CompetencyLevel VALUES('26661d01-d2a6-4d8b-9403-3f5c181df745','4e9c8e52-badc-4b52-8561-9e8aeb35c027',2,'Learner');
INSERT INTO CompetencyLevel VALUES('c7e83651-a815-4808-ac05-404c40c4d9cb','4e9c8e52-badc-4b52-8561-9e8aeb35c027',3,'Professional');
INSERT INTO CompetencyLevel VALUES('f0f55ae9-23d4-43e6-92fc-823ec1d87abb','4e9c8e52-badc-4b52-8561-9e8aeb35c027',4,'Role Model/Coach');
INSERT INTO CompetencyLevel VALUES('6ab3a908-5e6e-4712-b341-1e5133451809','4e9c8e52-badc-4b52-8561-9e8aeb35c027',5,'Expert');
INSERT INTO CompetencyLevel VALUES('378bcc58-0cb3-453e-8b25-da5423627adf','3303e801-70aa-4851-9f18-ffb68dd6ba8d',1,'Novice');
INSERT INTO CompetencyLevel VALUES('7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','3303e801-70aa-4851-9f18-ffb68dd6ba8d',2,'Learner');
INSERT INTO CompetencyLevel VALUES('e676fc96-5787-49bd-9878-e166a61c381d','3303e801-70aa-4851-9f18-ffb68dd6ba8d',3,'Professional');
INSERT INTO CompetencyLevel VALUES('4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','3303e801-70aa-4851-9f18-ffb68dd6ba8d',4,'Role Model/Coach');
INSERT INTO CompetencyLevel VALUES('aad2f4cb-de61-4e03-a816-a395c3fe8eff','3303e801-70aa-4851-9f18-ffb68dd6ba8d',5,'Expert');
CREATE TABLE IF NOT EXISTS "Behavior" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competency_level_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Behavior_competency_level_id_fkey" FOREIGN KEY ("competency_level_id") REFERENCES "CompetencyLevel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Behavior VALUES('7e3d7a6f-3aa2-456e-b889-bb9d7d9f2e27','5f396402-d194-43dc-a368-e1bc89130012','Assist in gathering basic safety information for program development');
INSERT INTO Behavior VALUES('982c6dcb-4ced-4ded-9a77-6cced8752687','5f396402-d194-43dc-a368-e1bc89130012','Record safety policies and procedures in designated systems');
INSERT INTO Behavior VALUES('1c7a4cfc-ac1e-4776-86b1-271a3fa36114','5f396402-d194-43dc-a368-e1bc89130012','Observe safety program planning meetings and take notes');
INSERT INTO Behavior VALUES('2bc1ba09-579d-4e3c-99e5-672e90350b3e','5f396402-d194-43dc-a368-e1bc89130012','Follow simple safety protocols and report compliance issues');
INSERT INTO Behavior VALUES('24388af2-6480-42d9-b47b-d95dc95f6392','5f396402-d194-43dc-a368-e1bc89130012','Prepare materials for daily tailboard safety meetings');
INSERT INTO Behavior VALUES('ab624550-1348-475f-b062-56474d6e4251','5f396402-d194-43dc-a368-e1bc89130012','Distribute personal protective equipment (PPE) to field employees');
INSERT INTO Behavior VALUES('9dbf75f9-7b40-4b08-9550-3de596778b99','5f396402-d194-43dc-a368-e1bc89130012','Participate in basic safety training sessions');
INSERT INTO Behavior VALUES('283e9904-7e10-4707-95ad-b5b354adc5ce','008a96c5-15ed-47f5-a63e-755d52b16ce6','Draft basic safety policies and procedures under supervision');
INSERT INTO Behavior VALUES('41464a41-59c2-4307-a972-1ecc90e7f32d','008a96c5-15ed-47f5-a63e-755d52b16ce6','Update safety programs based on regulatory changes and report modifications');
INSERT INTO Behavior VALUES('53f93f1e-f4b4-4bce-b9b9-dcedea5cc02a','008a96c5-15ed-47f5-a63e-755d52b16ce6','Contribute to safety risk assessments by identifying potential hazards');
INSERT INTO Behavior VALUES('b469d2cf-eaff-4908-98f9-09ad13c2078e','008a96c5-15ed-47f5-a63e-755d52b16ce6','Assist in monitoring safety program effectiveness and suggest improvements');
INSERT INTO Behavior VALUES('4110a2ec-94ae-4322-80d8-d41edacce868','008a96c5-15ed-47f5-a63e-755d52b16ce6','Conduct basic tailboard safety talks for small field crews');
INSERT INTO Behavior VALUES('5212d17c-1cc5-4596-a056-892b287635c5','008a96c5-15ed-47f5-a63e-755d52b16ce6','Help field supervisors identify potential safety hazards on job sites');
INSERT INTO Behavior VALUES('ec2765c8-ddbe-4c78-9bc8-cc229c7709de','008a96c5-15ed-47f5-a63e-755d52b16ce6','Deliver basic safety orientation sessions to new employees');
INSERT INTO Behavior VALUES('14d3c5f0-e5aa-48d9-b248-98874184381f','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Develop comprehensive safety programs independently, including policies and procedures');
INSERT INTO Behavior VALUES('49e2d2dd-8d5c-4b9e-bd80-b7a46d1a249f','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Implement risk mitigation strategies and adjust safety programs accordingly');
INSERT INTO Behavior VALUES('507ccb16-805d-406c-ad88-da628b475e84','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Manage safety resources effectively, balancing priorities across different areas');
INSERT INTO Behavior VALUES('80fd9a8e-8617-4542-97bf-cf25e2866890','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Create and maintain safety performance indicators and prepare compliance reports');
INSERT INTO Behavior VALUES('5db7fc69-0978-492c-9d68-5a58a0a0a53e','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Develop tailboard topics relevant to current field operations');
INSERT INTO Behavior VALUES('e71eae8f-1cb4-4595-944b-2417f587343a','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Implement safety initiatives that address specific field employee concerns');
INSERT INTO Behavior VALUES('8dfdd756-0bdf-4109-8e33-a958110ddfa9','94ecb7a7-f48d-47b4-badd-4f63e8a83901','Conduct safety training sessions on specific program components');
INSERT INTO Behavior VALUES('9ab7be83-a563-4045-9517-dd8ccd160acd','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Guide team members in complex safety program development and implementation');
INSERT INTO Behavior VALUES('7e107ff9-c247-49da-8eb6-2f52cef7a76c','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Lead safety program reviews and lessons learned sessions to improve future planning');
INSERT INTO Behavior VALUES('5a67a7ee-6cd4-4db6-a675-f0c70ad45ea9','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Optimize resource allocation across multiple safety initiatives to maximize effectiveness');
INSERT INTO Behavior VALUES('4cf6e04c-c89f-4fc8-a86a-2245e94612ab','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Mentor others in developing accurate safety performance forecasts and reports');
INSERT INTO Behavior VALUES('92591b6d-f669-41fd-89a9-bec1f842a74b','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Guide field supervisors in conducting effective tailboard safety meetings');
INSERT INTO Behavior VALUES('75dd1cb1-ca34-4752-b5f7-41b77002b6c9','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Lead safety stand-downs to address critical field safety issues');
INSERT INTO Behavior VALUES('2af8be65-1eca-4fbe-aed1-9224aa5e4f95','1bacd81e-3e13-4874-aef4-cdf315b40ab7','Design advanced safety training modules for high-risk activities');
INSERT INTO Behavior VALUES('4d194dc0-c6ba-4976-ae3a-90f193dcd6ff','103b6305-328c-4a88-a054-05ecf6c84458','Design strategic safety methodologies for high-stakes transmission and distribution projects');
INSERT INTO Behavior VALUES('f382eafc-aee1-4b33-b9ae-73f0aa5ccd13','103b6305-328c-4a88-a054-05ecf6c84458','Innovate new approaches to safety program execution that improve efficiency and reduce incidents');
INSERT INTO Behavior VALUES('994030e4-46c4-4410-bd19-7e4009bb2806','103b6305-328c-4a88-a054-05ecf6c84458','Align safety initiatives with organizational strategy and industry best practices');
INSERT INTO Behavior VALUES('ac1f5f87-3931-4443-b630-974e5ea081f0','103b6305-328c-4a88-a054-05ecf6c84458','Develop and implement cost-effective safety measures across multiple high-value projects');
INSERT INTO Behavior VALUES('28c96363-f946-4e68-8930-bb916c0515ad','103b6305-328c-4a88-a054-05ecf6c84458','Design field-based safety technologies that enhance real-time risk assessment');
INSERT INTO Behavior VALUES('fc6fab1d-5eaf-4119-9c67-5b53ab439cbf','103b6305-328c-4a88-a054-05ecf6c84458','Create industry-leading tailboard safety programs for transmission and distribution projects');
INSERT INTO Behavior VALUES('739669bc-d46b-4a8f-afa4-08636e5c5425','103b6305-328c-4a88-a054-05ecf6c84458','Establish comprehensive safety curricula that address industry-wide challenges');
INSERT INTO Behavior VALUES('aaf67438-f197-4b34-b487-96cd0853b962','5165029e-2523-49ba-8eed-95c55a5b48d5','Report observed safety incidents to supervisors');
INSERT INTO Behavior VALUES('40a696fa-2f56-4bcb-a95f-04b3e8a20156','5165029e-2523-49ba-8eed-95c55a5b48d5','Assist in gathering basic information for incident reports');
INSERT INTO Behavior VALUES('74d5c51f-2f8a-49da-adea-f6dd15946283','5165029e-2523-49ba-8eed-95c55a5b48d5','Participate in post-incident safety briefings');
INSERT INTO Behavior VALUES('2db2d4a9-5400-4d10-a730-5a05b2b478d6','5165029e-2523-49ba-8eed-95c55a5b48d5','Follow established incident response protocols');
INSERT INTO Behavior VALUES('86d00616-dc9d-4fcd-bb61-bcc246aa35dd','5165029e-2523-49ba-8eed-95c55a5b48d5','Assist in gathering field evidence for incident investigations');
INSERT INTO Behavior VALUES('45d45291-d1fd-4174-bc93-a71cc9b84533','5165029e-2523-49ba-8eed-95c55a5b48d5','Document initial observations from field incidents');
INSERT INTO Behavior VALUES('7a758bf6-282d-4e81-989e-b9e77f943334','5165029e-2523-49ba-8eed-95c55a5b48d5','Attend incident response training sessions');
INSERT INTO Behavior VALUES('77d02a3d-92c5-41f9-89b9-a46c3d05ba20','f754c71b-2032-4d3e-a86b-61deaad2576a','Conduct initial incident scene preservation and documentation');
INSERT INTO Behavior VALUES('e1b94045-ae51-4dce-bd0b-9da8c1875933','f754c71b-2032-4d3e-a86b-61deaad2576a','Assist in interviewing witnesses and collecting statements');
INSERT INTO Behavior VALUES('62784266-1926-4648-9915-a01f9ec62b70','f754c71b-2032-4d3e-a86b-61deaad2576a','Help identify immediate causes of incidents under supervision');
INSERT INTO Behavior VALUES('4843f83d-e70b-4f85-ac40-8c5f97526311','f754c71b-2032-4d3e-a86b-61deaad2576a','Contribute to the development of corrective action plans');
INSERT INTO Behavior VALUES('859b5a37-fed1-4859-bc5a-0cfb6d9b8743','f754c71b-2032-4d3e-a86b-61deaad2576a','Conduct preliminary field interviews following minor incidents');
INSERT INTO Behavior VALUES('b83b6ae0-e78a-4e0f-820f-ef1f47d6b23a','f754c71b-2032-4d3e-a86b-61deaad2576a','Assist in recreating incident scenarios using field diagrams');
INSERT INTO Behavior VALUES('f7ae969a-137e-4211-a080-1ee68fc851b2','f754c71b-2032-4d3e-a86b-61deaad2576a','Deliver basic incident prevention training to small groups');
INSERT INTO Behavior VALUES('5638bb8a-86d8-4da0-97d8-905a0922eaac','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Lead incident investigations, including root cause analysis');
INSERT INTO Behavior VALUES('6b62ee59-92a4-4bbf-b357-f6e70e6e69b6','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Develop comprehensive incident reports with actionable recommendations');
INSERT INTO Behavior VALUES('4f26c5b1-a4bc-4f9f-b8e8-73f48dde28dd','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Implement and track corrective actions to prevent recurrence');
INSERT INTO Behavior VALUES('748b043c-1608-4a18-ba41-aa7bdc162d11','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Analyze incident trends and patterns to identify systemic issues');
INSERT INTO Behavior VALUES('e158dea3-75ac-4650-86b1-efbf03e12cb7','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Lead on-site incident investigations in field settings');
INSERT INTO Behavior VALUES('0a16d8a7-94ce-475d-8f55-bf09f934864a','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Conduct post-incident tailboard sessions to share lessons learned with field crews');
INSERT INTO Behavior VALUES('2f2f0e26-4c89-4e1b-a7e4-729731821263','856bbe73-97ef-4638-9f84-f1d7f5396cc8','Conduct training sessions on incident reporting and investigation procedures');
INSERT INTO Behavior VALUES('ab85a218-db63-4431-9787-a27d56d848c2','667240c0-44f8-4b22-875b-8ace8a80fc56','Guide complex incident investigations in high-risk environments');
INSERT INTO Behavior VALUES('366868c8-10ba-4689-b418-b105bd3263f5','667240c0-44f8-4b22-875b-8ace8a80fc56','Mentor team members in advanced incident analysis techniques');
INSERT INTO Behavior VALUES('ca96671c-91c3-4ec4-b3a7-5ea96aa15ffb','667240c0-44f8-4b22-875b-8ace8a80fc56','Develop and improve incident investigation procedures and tools');
INSERT INTO Behavior VALUES('28f94af5-d53a-402c-8cd9-a79ec30737b2','667240c0-44f8-4b22-875b-8ace8a80fc56','Lead post-incident reviews and facilitate organizational learning');
INSERT INTO Behavior VALUES('158b4719-4b0d-4068-8a05-bfebaf6fcb0c','667240c0-44f8-4b22-875b-8ace8a80fc56','Design scenario-based training programs for field incident response and management');
INSERT INTO Behavior VALUES('e1f078c6-9515-4c5a-8138-b880948a91b8','667240c0-44f8-4b22-875b-8ace8a80fc56','Mentor field supervisors in advanced incident analysis techniques');
INSERT INTO Behavior VALUES('5a7f3fd7-3280-483e-86c1-1eeea25607ff','667240c0-44f8-4b22-875b-8ace8a80fc56','Create and deliver advanced training on root cause analysis and corrective action development');
INSERT INTO Behavior VALUES('ce5e7e45-63a5-4c9d-b1b8-a94b66453dbb','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Design innovative incident prevention strategies for industry-wide application');
INSERT INTO Behavior VALUES('43014fc3-c15f-4ef1-8874-a3830a583a42','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Collaborate with regulatory agencies to improve incident reporting standards');
INSERT INTO Behavior VALUES('10464ba0-369a-4d26-83f4-a7f5bdf6f900','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Develop predictive incident analysis models using advanced data analytics');
INSERT INTO Behavior VALUES('1e624288-efe1-4e7c-8947-e83d975c6914','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Influence organizational policies to foster a proactive safety culture');
INSERT INTO Behavior VALUES('3a75d8d1-f7cc-4eeb-9e34-be8dcb258b29','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Create innovative field investigation methodologies that set industry standards');
INSERT INTO Behavior VALUES('6bf35ab9-97bc-4f1b-abbd-64494fb41c61','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Establish best practices for field incident prevention in collaboration with industry partners');
INSERT INTO Behavior VALUES('4a83a4f3-7532-45a0-850f-368c58438d50','141a5ebb-536e-4a82-ab56-7a4c64180c6b','Develop industry-leading incident investigation and prevention training programs');
INSERT INTO Behavior VALUES('803a50ca-af4a-4108-8ef0-b45f309dfa15','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Assist in conducting basic safety walkthroughs');
INSERT INTO Behavior VALUES('d2a28247-69f2-4799-9048-6a1f2bc857c2','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Record observations during safety inspections');
INSERT INTO Behavior VALUES('e8a2e950-cc4b-4aca-8b40-9ca906c22030','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Maintain inspection checklists and documentation');
INSERT INTO Behavior VALUES('ea0bc216-0aa3-490a-9c62-4265dea1d088','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Report obvious safety hazards to supervisors');
INSERT INTO Behavior VALUES('46c82cae-75bd-49d8-8dea-bbfbef534c2c','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Assist in conducting basic field safety walkthroughs');
INSERT INTO Behavior VALUES('e64aa4d8-5f82-4c1b-8842-b52cd659f96d','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Record observations during tailboard safety meetings');
INSERT INTO Behavior VALUES('ed055efe-6805-4815-b24a-29ca0814a17d','99d2ac52-5b8c-42ca-874e-0ceb0338bb71','Participate in compliance training sessions');
INSERT INTO Behavior VALUES('4aac5766-f04b-4b76-a39a-727495aaabf5','5f8f8974-ed83-45da-90e0-340da3c8e597','Conduct routine safety inspections under supervision');
INSERT INTO Behavior VALUES('8324ae64-1432-4c51-80f1-cc03016d93e1','5f8f8974-ed83-45da-90e0-340da3c8e597','Identify common safety violations and non-compliance issues');
INSERT INTO Behavior VALUES('da27007f-6f4d-4b20-82c1-db51df5a5ef7','5f8f8974-ed83-45da-90e0-340da3c8e597','Assist in preparing inspection reports and recommendations');
INSERT INTO Behavior VALUES('7f88e2d8-2f35-4e5d-9d14-af1e61ea4a20','5f8f8974-ed83-45da-90e0-340da3c8e597','Help track the implementation of corrective actions');
INSERT INTO Behavior VALUES('87e835e1-4488-416f-9e5f-12081036e898','5f8f8974-ed83-45da-90e0-340da3c8e597','Conduct routine field safety inspections under supervision');
INSERT INTO Behavior VALUES('a443c5d0-f452-413d-a9e5-35403102120f','5f8f8974-ed83-45da-90e0-340da3c8e597','Identify common safety violations observed in the field');
INSERT INTO Behavior VALUES('8dc0dba8-2dcc-47a7-abf3-3fbb851d71a6','5f8f8974-ed83-45da-90e0-340da3c8e597','Deliver basic compliance training to small work groups');
INSERT INTO Behavior VALUES('97468b1e-9afc-4460-80c9-824745016f66','a83b1777-910c-44a3-a14b-85003500877a','Plan and execute comprehensive safety audits and inspections');
INSERT INTO Behavior VALUES('b5c35e05-384f-43b7-b0f0-4cdddedded5b','a83b1777-910c-44a3-a14b-85003500877a','Evaluate compliance with OSHA, DOT, and other relevant regulations');
INSERT INTO Behavior VALUES('c062d892-1f03-4c52-af01-f952379f5935','a83b1777-910c-44a3-a14b-85003500877a','Develop detailed inspection reports with prioritized recommendations');
INSERT INTO Behavior VALUES('137b2118-542b-4364-8523-47b1c2c2ce79','a83b1777-910c-44a3-a14b-85003500877a','Implement and monitor corrective action plans to address non-compliance');
INSERT INTO Behavior VALUES('6c17499d-a0ff-48ba-9ba8-909e93d06ae5','a83b1777-910c-44a3-a14b-85003500877a','Conduct field-specific compliance audits for transmission and distribution projects');
INSERT INTO Behavior VALUES('2d5046dc-fc4e-4924-9113-e076f543a7e9','a83b1777-910c-44a3-a14b-85003500877a','Develop tailored inspection protocols for different field environments');
INSERT INTO Behavior VALUES('6c7c1b58-61f1-4b6a-a4be-f86db88486df','a83b1777-910c-44a3-a14b-85003500877a','Conduct training sessions on regulatory compliance and inspection procedures');
INSERT INTO Behavior VALUES('67226794-bf3f-4ed3-ae90-4b16157a88a0','c4c095c6-f696-469f-86bf-117e763ab548','Design advanced inspection protocols for complex work environments');
INSERT INTO Behavior VALUES('610e239e-216b-4140-9521-85cd2c086fcd','c4c095c6-f696-469f-86bf-117e763ab548','Mentor others in conducting thorough and effective safety inspections');
INSERT INTO Behavior VALUES('4cd45c96-cdd0-4142-86e9-84ee6f8dd004','c4c095c6-f696-469f-86bf-117e763ab548','Lead multi-disciplinary teams in comprehensive safety audits');
INSERT INTO Behavior VALUES('88e6f83a-4ad7-4a22-9671-b7bb57d00e9f','c4c095c6-f696-469f-86bf-117e763ab548','Develop strategies to improve overall compliance and safety performance');
INSERT INTO Behavior VALUES('8c38954d-7250-4f11-9d5b-afb08e44dcbe','c4c095c6-f696-469f-86bf-117e763ab548','Guide field teams in implementing best practices for safety compliance');
INSERT INTO Behavior VALUES('8de23109-d1ae-473c-944c-d7fb8810e531','c4c095c6-f696-469f-86bf-117e763ab548','Create field-specific training programs on compliance and inspection techniques');
INSERT INTO Behavior VALUES('fa90f631-8f29-4575-b612-efd73f75b25b','c4c095c6-f696-469f-86bf-117e763ab548','Design and deliver advanced compliance training programs for supervisors and managers');
INSERT INTO Behavior VALUES('cd010b16-5be7-42f0-8fc1-015ee0018cfb','3bce0c23-1806-4313-a6ed-742d473f3a77','Create innovative compliance management systems that set industry benchmarks');
INSERT INTO Behavior VALUES('f79aeb3b-2d42-40b9-b6ac-12c52c5b7e7d','3bce0c23-1806-4313-a6ed-742d473f3a77','Collaborate with regulatory bodies to influence safety standards development');
INSERT INTO Behavior VALUES('df5514d6-1729-424b-82f8-5ec4a4789bc5','3bce0c23-1806-4313-a6ed-742d473f3a77','Design predictive compliance models using data analytics and trend analysis');
INSERT INTO Behavior VALUES('b2520c85-22da-481e-b90f-ca8c41f68bf7','3bce0c23-1806-4313-a6ed-742d473f3a77','Develop organization-wide strategies to foster a culture of proactive compliance');
INSERT INTO Behavior VALUES('7e59aabd-86ee-4336-8c0f-bb1ccb347ad7','3bce0c23-1806-4313-a6ed-742d473f3a77','Pioneer advanced field inspection technologies for high-risk environments');
INSERT INTO Behavior VALUES('c4d68808-c125-4759-bf22-b5af581158d2','3bce0c23-1806-4313-a6ed-742d473f3a77','Establish industry-leading compliance programs for transmission and distribution projects');
INSERT INTO Behavior VALUES('17d9471f-dca2-4859-8511-075bed41208d','3bce0c23-1806-4313-a6ed-742d473f3a77','Create cutting-edge training programs on transformational safety leadership and compliance');
INSERT INTO Behavior VALUES('f46e8680-73bf-41c1-8244-9495580c0538','85e0fe3d-2384-4757-a3e4-30a96abf7023','Collect basic safety data from various sources');
INSERT INTO Behavior VALUES('e2d15876-da53-4944-b6a2-f146366f0dab','85e0fe3d-2384-4757-a3e4-30a96abf7023','Enter safety information into designated databases or spreadsheets');
INSERT INTO Behavior VALUES('e3c25c8d-350a-4696-ba4e-a87cbde601de','85e0fe3d-2384-4757-a3e4-30a96abf7023','Assist in generating simple safety reports using templates');
INSERT INTO Behavior VALUES('cb337c8f-11c1-4be0-ae49-987baa8f490d','85e0fe3d-2384-4757-a3e4-30a96abf7023','Distribute routine safety performance updates to team members');
INSERT INTO Behavior VALUES('61abd026-75e0-4785-a980-b5ba88e65af0','85e0fe3d-2384-4757-a3e4-30a96abf7023','Gather field-specific safety data during site visits');
INSERT INTO Behavior VALUES('6c9d9ef8-ab10-4408-bca3-72cd94b6cd11','85e0fe3d-2384-4757-a3e4-30a96abf7023','Record safety observations from tailboard meetings');
INSERT INTO Behavior VALUES('89c8445f-b498-4bc5-a089-3c5d397d1664','85e0fe3d-2384-4757-a3e4-30a96abf7023','Attend training on basic data collection and reporting procedures');
INSERT INTO Behavior VALUES('424a2c4c-2a1b-418c-9663-2b6bde786790','26661d01-d2a6-4d8b-9403-3f5c181df745','Compile safety statistics and metrics under supervision');
INSERT INTO Behavior VALUES('618f63fb-7d2b-4bd1-91c6-2be4a12106ed','26661d01-d2a6-4d8b-9403-3f5c181df745','Create basic data visualizations to represent safety trends');
INSERT INTO Behavior VALUES('e2d75027-2f7b-4f1a-b8a6-bc2afc855ed8','26661d01-d2a6-4d8b-9403-3f5c181df745','Assist in preparing monthly safety performance reports');
INSERT INTO Behavior VALUES('b8fd9d12-45cd-4acd-8422-0b2fe417e8ef','26661d01-d2a6-4d8b-9403-3f5c181df745','Identify data discrepancies and report them to supervisors');
INSERT INTO Behavior VALUES('f3f7a927-ec4d-4486-8f3b-b3751a701109','26661d01-d2a6-4d8b-9403-3f5c181df745','Analyze field safety data to identify basic trends');
INSERT INTO Behavior VALUES('e017fa38-b0a1-4f12-98e5-b627cc2dc8df','26661d01-d2a6-4d8b-9403-3f5c181df745','Prepare simple reports on field safety performance');
INSERT INTO Behavior VALUES('3f52f578-54e7-479f-adf5-10676bee9e88','26661d01-d2a6-4d8b-9403-3f5c181df745','Deliver basic training on data entry and reporting procedures');
INSERT INTO Behavior VALUES('746ef437-fc3a-416f-b2c3-065ab2859400','c7e83651-a815-4808-ac05-404c40c4d9cb','Analyze complex safety data sets to identify trends and patterns');
INSERT INTO Behavior VALUES('ef5dc23b-9e01-4533-8e45-466b38d28995','c7e83651-a815-4808-ac05-404c40c4d9cb','Develop comprehensive safety performance dashboards and reports');
INSERT INTO Behavior VALUES('a670837a-dda3-4299-8aef-17fea51109f3','c7e83651-a815-4808-ac05-404c40c4d9cb','Interpret safety metrics to provide actionable insights to management');
INSERT INTO Behavior VALUES('808bf0ea-004a-40c6-b2c9-ace499bb1d48','c7e83651-a815-4808-ac05-404c40c4d9cb','Implement data quality control measures to ensure accuracy and reliability');
INSERT INTO Behavior VALUES('dc9c081f-1183-41f8-8c63-5d4fbb03ba85','c7e83651-a815-4808-ac05-404c40c4d9cb','Conduct in-depth analysis of field-generated safety data');
INSERT INTO Behavior VALUES('969df108-ec14-427b-8a4a-c766bf370d05','c7e83651-a815-4808-ac05-404c40c4d9cb','Create field-specific safety performance indicators');
INSERT INTO Behavior VALUES('de356b4d-8a0f-47be-91fc-e991225c6f73','c7e83651-a815-4808-ac05-404c40c4d9cb','Conduct training sessions on safety data analysis and interpretation');
INSERT INTO Behavior VALUES('b9658977-94c1-4781-85cb-c8d43888421b','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Design advanced safety analytics frameworks for large-scale projects');
INSERT INTO Behavior VALUES('a2579e29-5e7b-43a2-bc59-b3ed78d449f8','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Mentor team members in sophisticated data analysis techniques');
INSERT INTO Behavior VALUES('3851c12b-cfc3-4b00-8727-a6eb28d0926e','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Lead the integration of predictive analytics in safety management');
INSERT INTO Behavior VALUES('d3318519-f4ce-435a-af39-739371c5a7f9','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Develop strategies to improve data-driven decision-making in safety');
INSERT INTO Behavior VALUES('c1e5ee9b-6179-4782-ae66-ff7ef874660d','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Guide field teams in effective data collection and reporting practices');
INSERT INTO Behavior VALUES('611fa10a-c39a-4134-9573-238068e1cb08','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Develop predictive models for field safety performance');
INSERT INTO Behavior VALUES('b9c79986-7464-4ad8-be97-a180ee6bf890','f0f55ae9-23d4-43e6-92fc-823ec1d87abb','Create and deliver advanced training programs on safety data management and analysis');
INSERT INTO Behavior VALUES('d9ac07c8-7d3d-451f-94e2-42624289b305','6ab3a908-5e6e-4712-b341-1e5133451809','Create innovative safety data models that drive industry-wide improvements');
INSERT INTO Behavior VALUES('ee3b4f2a-7c51-41d6-a877-8d4340046ae4','6ab3a908-5e6e-4712-b341-1e5133451809','Collaborate with IT teams to develop cutting-edge safety analytics platforms');
INSERT INTO Behavior VALUES('669cc30d-788b-4726-a8a4-2933e0c44005','6ab3a908-5e6e-4712-b341-1e5133451809','Influence organizational strategy through data-driven safety insights');
INSERT INTO Behavior VALUES('d7c33059-2485-4070-a14f-fe1f1b32b3e5','6ab3a908-5e6e-4712-b341-1e5133451809','Pioneer the use of artificial intelligence and machine learning in safety analytics');
INSERT INTO Behavior VALUES('6e2dc8aa-fba5-4067-8315-4c05557dd226','6ab3a908-5e6e-4712-b341-1e5133451809','Establish industry benchmarks for field safety data analysis and reporting');
INSERT INTO Behavior VALUES('081ea1c6-494e-46a6-863c-995c86beb44f','6ab3a908-5e6e-4712-b341-1e5133451809','Develop advanced predictive models for high-risk field operations');
INSERT INTO Behavior VALUES('61060a0d-10d0-4dff-be7f-15bb8e4ae166','6ab3a908-5e6e-4712-b341-1e5133451809','Establish industry-leading training programs on advanced safety data analytics and predictive modeling');
INSERT INTO Behavior VALUES('f4ce1884-eeea-4213-afac-aa21309ac1f3','378bcc58-0cb3-453e-8b25-da5423627adf','Distribute safety communications to team members');
INSERT INTO Behavior VALUES('e211ca03-9f3d-401c-b195-3499fb529547','378bcc58-0cb3-453e-8b25-da5423627adf','Participate in safety meetings and tailboard talks');
INSERT INTO Behavior VALUES('70619d5b-49b4-4d37-8542-8205fd91267d','378bcc58-0cb3-453e-8b25-da5423627adf','Report safety concerns through appropriate channels');
INSERT INTO Behavior VALUES('b373ac78-dcc4-41d6-a9a8-e7ad42a6793a','378bcc58-0cb3-453e-8b25-da5423627adf','Assist in organizing safety awareness events');
INSERT INTO Behavior VALUES('a3118c0f-b4e2-4049-98a2-5230e664d70b','378bcc58-0cb3-453e-8b25-da5423627adf','Attend safety culture training sessions');
INSERT INTO Behavior VALUES('e2e89da2-ef5e-4827-8a97-211034c10d42','378bcc58-0cb3-453e-8b25-da5423627adf','Support the preparation of materials for tailboard meetings');
INSERT INTO Behavior VALUES('4956901d-f668-408b-8d6c-75d8ceed78cd','378bcc58-0cb3-453e-8b25-da5423627adf','Participate in basic safety communication training');
INSERT INTO Behavior VALUES('9387133d-728a-4f3f-bc00-ade78d41bb5b','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Prepare basic safety communications under supervision');
INSERT INTO Behavior VALUES('380e2036-be4b-423d-8341-0e019ed49873','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Facilitate small group discussions on safety topics');
INSERT INTO Behavior VALUES('9952fcad-57f9-4128-833a-8d06d09564f9','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Contribute ideas for improving safety engagement');
INSERT INTO Behavior VALUES('152afd31-5e97-48ce-bebb-998ae4cb7ccd','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Assist in developing safety awareness materials');
INSERT INTO Behavior VALUES('c6db3eb3-eb60-4fc9-b202-7607170122fd','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Deliver basic safety culture presentations to peers');
INSERT INTO Behavior VALUES('d279436f-c5af-435d-9dd8-2b0e31da43db','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Conduct simple tailboard talks on routine safety topics');
INSERT INTO Behavior VALUES('250f9c05-ada0-403b-ad2b-23a1b5356f52','7fc33cb1-a1ec-4608-93bb-f0ced82e6c4d','Deliver basic safety communication training to small groups');
INSERT INTO Behavior VALUES('d0b56903-9209-4030-865c-6909771fb10c','e676fc96-5787-49bd-9878-e166a61c381d','Develop and implement effective safety communication strategies');
INSERT INTO Behavior VALUES('ee1a7c07-f568-4bf8-87a5-b65204552171','e676fc96-5787-49bd-9878-e166a61c381d','Lead safety meetings and facilitate open discussions on safety issues');
INSERT INTO Behavior VALUES('44ed4e50-9b54-4a31-a89a-62f6e861bcbd','e676fc96-5787-49bd-9878-e166a61c381d','Design and execute safety awareness campaigns');
INSERT INTO Behavior VALUES('f8dca4a2-1302-45e9-bb91-fecdb65dca55','e676fc96-5787-49bd-9878-e166a61c381d','Measure and analyze safety culture indicators');
INSERT INTO Behavior VALUES('3f054065-0295-4b0d-acbf-5aeff22cb87a','e676fc96-5787-49bd-9878-e166a61c381d','Conduct training sessions on safety leadership and communication');
INSERT INTO Behavior VALUES('eb8ab482-8bcf-40b2-947c-9cbeb438af38','e676fc96-5787-49bd-9878-e166a61c381d','Create engaging content for daily tailboard meetings');
INSERT INTO Behavior VALUES('627a015d-4ed8-454a-a5be-12ed4014c55c','e676fc96-5787-49bd-9878-e166a61c381d','Develop and deliver comprehensive safety culture training programs');
INSERT INTO Behavior VALUES('1a9e3a1a-0b72-4ee0-ac2c-8d62d55868db','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Create comprehensive safety communication plans for complex projects');
INSERT INTO Behavior VALUES('4c98eb32-211a-4d4c-89b6-d206e3a32d88','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Mentor others in developing effective safety leadership skills');
INSERT INTO Behavior VALUES('b2995675-513d-4dbd-ae08-b305123c7d63','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Lead initiatives to transform organizational safety culture');
INSERT INTO Behavior VALUES('d70bc4ad-27e3-40ca-8267-f3da16f17daf','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Develop strategies to improve employee engagement in safety programs');
INSERT INTO Behavior VALUES('9bed2c8f-f4e0-4d35-907f-082f3aa39a53','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Design and deliver advanced safety culture training for management');
INSERT INTO Behavior VALUES('4aa80621-bb77-4254-9406-5e6de08ebab5','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Guide field supervisors in enhancing the effectiveness of tailboard meetings');
INSERT INTO Behavior VALUES('b4e29b38-2367-4789-a679-2e9801ae0bb1','4a2dbba6-fd9a-473d-bf29-6412eb4ad08f','Create and implement train-the-trainer programs for safety communication');
INSERT INTO Behavior VALUES('addeaf8e-a6a8-461a-8ad3-e971194a4e64','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Innovate industry-leading approaches to safety communication and culture change');
INSERT INTO Behavior VALUES('da3d53cd-55c2-40ae-9085-2b908b1ee5c5','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Influence industry standards for safety leadership and cultural excellence');
INSERT INTO Behavior VALUES('8da2b2bd-92cf-4723-8641-78fece5767ea','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Develop predictive models for assessing and improving safety culture');
INSERT INTO Behavior VALUES('965f9922-11b0-421d-9371-fbc3f3d196c6','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Create strategies to align safety culture with overall organizational values');
INSERT INTO Behavior VALUES('5f4d1373-2d32-4ed8-879f-2a3f7d63a3ae','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Establish cutting-edge training programs on transformational safety leadership');
INSERT INTO Behavior VALUES('392e18b8-f0fc-4a40-9155-9a2dcb5d27b6','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Pioneer innovative methods for fostering a strong safety culture in field operations');
INSERT INTO Behavior VALUES('3a8c6728-91e7-4e03-8b3a-30e856662717','aad2f4cb-de61-4e03-a816-a395c3fe8eff','Design and implement comprehensive safety culture transformation programs');
CREATE TABLE IF NOT EXISTS "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "completed_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Assessment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "AssessmentRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "criticality" INTEGER NOT NULL,
    "current_level" INTEGER NOT NULL,
    "expected_level" INTEGER NOT NULL,
    "development_needed" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "AssessmentRating_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AssessmentRating_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "SupervisorRating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessment_id" TEXT NOT NULL,
    "competency_id" TEXT NOT NULL,
    "criticality" INTEGER NOT NULL,
    "current_level" INTEGER NOT NULL,
    "expected_level" INTEGER NOT NULL,
    "development_needed" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "SupervisorRating_competency_id_fkey" FOREIGN KEY ("competency_id") REFERENCES "Competency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SupervisorRating_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "AssessmentRating_assessment_id_competency_id_key" ON "AssessmentRating"("assessment_id", "competency_id");
CREATE UNIQUE INDEX "SupervisorRating_assessment_id_competency_id_key" ON "SupervisorRating"("assessment_id", "competency_id");