import { faker } from '@faker-js/faker'
import { prisma } from '#app/utils/db.server.ts'
import { MOCK_CODE_GITHUB } from '#app/utils/providers/constants'
import {
	createPassword,
	createUser,
	getNoteImages,
	getUserImages,
} from '#tests/db-utils.ts'
import { insertGitHubUser } from '#tests/mocks/github.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	const totalUsers = 5
	console.time(`👤 Created ${totalUsers} users...`)
	const noteImages = await getNoteImages()
	const userImages = await getUserImages()

	// Create roles first
	await prisma.role.upsert({
		where: { name: 'admin' },
		update: {},
		create: {
			name: 'admin',
			description: 'Administrator role',
		},
	})
	
	await prisma.role.upsert({
		where: { name: 'user' },
		update: {},
		create: {
			name: 'user',
			description: 'Default user role',
		},
	})

	for (let index = 0; index < totalUsers; index++) {
		const userData = createUser()
		const user = await prisma.user.create({
			select: { id: true },
			data: {
				...userData,
				password: { create: createPassword(userData.username) },
				roles: { connect: { name: 'user' } },
			},
		})

		
		// Upload user profile image
		const userImage = userImages[index % userImages.length]
		if (userImage) {
			await prisma.userImage.create({
				data: {
					userId: user.id,
					objectKey: userImage.objectKey,
				},
			})
		}

		// Create notes with images
		const notesCount = faker.number.int({ min: 1, max: 3 })
		for (let noteIndex = 0; noteIndex < notesCount; noteIndex++) {
			const note = await prisma.note.create({
				select: { id: true },
				data: {
					title: faker.lorem.sentence(),
					content: faker.lorem.paragraphs(),
					ownerId: user.id,
				},
			})

			// Add images to note
			const noteImageCount = faker.number.int({ min: 1, max: 3 })
			for (let imageIndex = 0; imageIndex < noteImageCount; imageIndex++) {
				const imgNumber = faker.number.int({ min: 0, max: 9 })
				const noteImage = noteImages[imgNumber]
				if (noteImage) {
					await prisma.noteImage.create({
						data: {
							noteId: note.id,
							altText: noteImage.altText,
							objectKey: noteImage.objectKey,
						},
					})
				}
			}
		}
	}
	console.timeEnd(`👤 Created ${totalUsers} users...`)

	console.time(`🐨 Created admin user "kody"`)

	const kodyImages = {
		kodyUser: { objectKey: 'user/kody.png' },
		cuteKoala: {
			altText: 'an adorable koala cartoon illustration',
			objectKey: 'kody-notes/cute-koala.png',
		},
		koalaEating: {
			altText: 'a cartoon illustration of a koala in a tree eating',
			objectKey: 'kody-notes/koala-eating.png',
		},
		koalaCuddle: {
			altText: 'a cartoon illustration of koalas cuddling',
			objectKey: 'kody-notes/koala-cuddle.png',
		},
		mountain: {
			altText: 'a beautiful mountain covered in snow',
			objectKey: 'kody-notes/mountain.png',
		},
		koalaCoder: {
			altText: 'a koala coding at the computer',
			objectKey: 'kody-notes/koala-coder.png',
		},
		koalaMentor: {
			altText:
				'a koala in a friendly and helpful posture. The Koala is standing next to and teaching a woman who is coding on a computer and shows positive signs of learning and understanding what is being explained.',
			objectKey: 'kody-notes/koala-mentor.png',
		},
		koalaSoccer: {
			altText: 'a cute cartoon koala kicking a soccer ball on a soccer field ',
			objectKey: 'kody-notes/koala-soccer.png',
		},
	}

	const githubUser = await insertGitHubUser(MOCK_CODE_GITHUB)

	const kody = await prisma.user.create({
		select: { id: true },
		data: {
			email: 'kody@kcd.dev',
			username: 'kody',
			name: 'Kody',
			password: { create: createPassword('kodylovesyou') },
			connections: {
				create: {
					providerName: 'github',
					providerId: String(githubUser.profile.id),
				},
			},
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
		},
	})

	await prisma.userImage.create({
		data: {
			userId: kody.id,
			objectKey: kodyImages.kodyUser.objectKey,
		},
	})

	// Create Kody's notes
	const kodyNotes = [
		{
			id: 'd27a197e',
			title: 'Basic Koala Facts',
			content:
				'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
			images: [kodyImages.cuteKoala, kodyImages.koalaEating],
		},
		{
			id: '414f0c09',
			title: 'Koalas like to cuddle',
			content:
				'Cuddly critters, koalas measure about 60cm to 85cm long, and weigh about 14kg.',
			images: [kodyImages.koalaCuddle],
		},
		{
			id: '260366b1',
			title: 'Not bears',
			content:
				"Although you may have heard people call them koala 'bears', these awesome animals aren't bears at all – they are in fact marsupials. A group of mammals, most marsupials have pouches where their newborns develop.",
			images: [],
		},
		{
			id: 'bb79cf45',
			title: 'Snowboarding Adventure',
			content:
				"Today was an epic day on the slopes! Shredded fresh powder with my friends, caught some sick air, and even attempted a backflip. Can't wait for the next snowy adventure!",
			images: [kodyImages.mountain],
		},
		{
			id: '9f4308be',
			title: 'Onewheel Tricks',
			content:
				"Mastered a new trick on my Onewheel today called '180 Spin'. It's exhilarating to carve through the streets while pulling off these rad moves. Time to level up and learn more!",
			images: [],
		},
		{
			id: '306021fb',
			title: 'Coding Dilemma',
			content:
				"Stuck on a bug in my latest coding project. Need to figure out why my function isn't returning the expected output. Time to dig deep, debug, and conquer this challenge!",
			images: [kodyImages.koalaCoder],
		},
		{
			id: '16d4912a',
			title: 'Coding Mentorship',
			content:
				"Had a fantastic coding mentoring session today with Sarah. Helped her understand the concept of recursion, and she made great progress. It's incredibly fulfilling to help others improve their coding skills.",
			images: [kodyImages.koalaMentor],
		},
		{
			id: '3199199e',
			title: 'Koala Fun Facts',
			content:
				"Did you know that koalas sleep for up to 20 hours a day? It's because their diet of eucalyptus leaves doesn't provide much energy. But when I'm awake, I enjoy munching on leaves, chilling in trees, and being the cuddliest koala around!",
			images: [],
		},
		{
			id: '2030ffd3',
			title: 'Skiing Adventure',
			content:
				'Spent the day hitting the slopes on my skis. The fresh powder made for some incredible runs and breathtaking views. Skiing down the mountain at top speed is an adrenaline rush like no other!',
			images: [kodyImages.mountain],
		},
		{
			id: 'f375a804',
			title: 'Code Jam Success',
			content:
				'Participated in a coding competition today and secured the first place! The adrenaline, the challenging problems, and the satisfaction of finding optimal solutions—it was an amazing experience. Feeling proud and motivated to keep pushing my coding skills further!',
			images: [kodyImages.koalaCoder],
		},
		{
			id: '562c541b',
			title: 'Koala Conservation Efforts',
			content:
				"Joined a local conservation group to protect koalas and their habitats. Together, we're planting more eucalyptus trees, raising awareness about their endangered status, and working towards a sustainable future for these adorable creatures. Every small step counts!",
			images: [],
		},
		{
			id: 'f67ca40b',
			title: 'Game day',
			content:
				"Just got back from the most amazing game. I've been playing soccer for a long time, but I've not once scored a goal. Well, today all that changed! I finally scored my first ever goal.\n\nI'm in an indoor league, and my team's not the best, but we're pretty good and I have fun, that's all that really matters. Anyway, I found myself at the other end of the field with the ball. It was just me and the goalie. I normally just kick the ball and hope it goes in, but the ball was already rolling toward the goal. The goalie was about to get the ball, so I had to charge. I managed to get possession of the ball just before the goalie got it. I brought it around the goalie and had a perfect shot. I screamed so loud in excitement. After all these years playing, I finally scored a goal!\n\nI know it's not a lot for most folks, but it meant a lot to me. We did end up winning the game by one. It makes me feel great that I had a part to play in that.\n\nIn this team, I'm the captain. I'm constantly cheering my team on. Even after getting injured, I continued to come and watch from the side-lines. I enjoy yelling (encouragingly) at my team mates and helping them be the best they can. I'm definitely not the best player by a long stretch. But I really enjoy the game. It's a great way to get exercise and have good social interactions once a week.\n\nThat said, it can be hard to keep people coming and paying dues and stuff. If people don't show up it can be really hard to find subs. I have a list of people I can text, but sometimes I can't find anyone.\n\nBut yeah, today was awesome. I felt like more than just a player that gets in the way of the opposition, but an actual asset to the team. Really great feeling.\n\nAnyway, I'm rambling at this point and really this is just so we can have a note that's pretty long to test things out. I think it's long enough now... Cheers!",
			images: [kodyImages.koalaSoccer],
		},
	]

	for (const noteData of kodyNotes) {
		const note = await prisma.note.create({
			select: { id: true },
			data: {
				id: noteData.id,
				title: noteData.title,
				content: noteData.content,
				ownerId: kody.id,
			},
		})

		for (const image of noteData.images) {
			await prisma.noteImage.create({
				data: {
					noteId: note.id,
					altText: image.altText,
					objectKey: image.objectKey,
				},
			})
		}
	}

	console.log(`🐨 Created admin user "kody"`)

	console.log('Starting database seeding...');

	// Clean up existing data if needed
	await prisma.behavior.deleteMany({});
	await prisma.competencyLevel.deleteMany({});
	await prisma.competency.deleteMany({});
  
	console.log('Database cleaned, starting to seed competencies...');
  
	// 1. Safety Program Management
	const safetyProgramManagement = await prisma.competency.create({
	  data: {
		name: 'Safety Program Management',
		description: 'The ability to develop, implement, and maintain comprehensive safety programs, policies, and procedures in compliance with local, state, and federal regulations, including OSHA and DOT standards.'
	  }
	});
  
	// 2. Incident Management and Investigation
	const incidentManagementInvestigation = await prisma.competency.create({
	  data: {
		name: 'Incident Management and Investigation',
		description: 'The ability to respond to, investigate, and analyze safety incidents, implement corrective actions, and develop preventive measures to enhance overall safety performance.'
	  }
	});
  
	// 3. Compliance and Inspections
	const complianceInspections = await prisma.competency.create({
	  data: {
		name: 'Compliance and Inspections',
		description: 'The ability to conduct thorough safety inspections, ensure compliance with regulatory standards, and implement corrective measures to maintain a safe work environment.'
	  }
	});
  
	// 4. Safety Data Analysis and Reporting
	const safetyDataAnalysisReporting = await prisma.competency.create({
	  data: {
		name: 'Safety Data Analysis and Reporting',
		description: 'The ability to collect, analyze, and interpret safety data to generate meaningful insights, create comprehensive reports, and drive data-informed decision-making in safety management.'
	  }
	});
  
	// 5. Safety Communication and Culture
	const safetyCommunicationCulture = await prisma.competency.create({
	  data: {
		name: 'Safety Communication and Culture',
		description: 'The ability to effectively communicate safety information, foster a positive safety culture, and promote employee engagement in safety initiatives.'
	  }
	});
  
	console.log('Competencies created, adding levels and behaviors...');
  
	// 1. Safety Program Management - Levels and Behaviors
	// Level 1
	const spmLevel1 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyProgramManagement.id,
		level: 1,
		title: 'Novice'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: spmLevel1.id, description: 'Assist in gathering basic safety information for program development' },
		{ competencyLevelId: spmLevel1.id, description: 'Record safety policies and procedures in designated systems' },
		{ competencyLevelId: spmLevel1.id, description: 'Observe safety program planning meetings and take notes' },
		{ competencyLevelId: spmLevel1.id, description: 'Follow simple safety protocols and report compliance issues' },
		{ competencyLevelId: spmLevel1.id, description: 'Prepare materials for daily tailboard safety meetings' },
		{ competencyLevelId: spmLevel1.id, description: 'Distribute personal protective equipment (PPE) to field employees' },
		{ competencyLevelId: spmLevel1.id, description: 'Participate in basic safety training sessions' }
	  ]
	});
  
	// Level 2
	const spmLevel2 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyProgramManagement.id,
		level: 2,
		title: 'Learner'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: spmLevel2.id, description: 'Draft basic safety policies and procedures under supervision' },
		{ competencyLevelId: spmLevel2.id, description: 'Update safety programs based on regulatory changes and report modifications' },
		{ competencyLevelId: spmLevel2.id, description: 'Contribute to safety risk assessments by identifying potential hazards' },
		{ competencyLevelId: spmLevel2.id, description: 'Assist in monitoring safety program effectiveness and suggest improvements' },
		{ competencyLevelId: spmLevel2.id, description: 'Conduct basic tailboard safety talks for small field crews' },
		{ competencyLevelId: spmLevel2.id, description: 'Help field supervisors identify potential safety hazards on job sites' },
		{ competencyLevelId: spmLevel2.id, description: 'Deliver basic safety orientation sessions to new employees' }
	  ]
	});
  
	// Level 3
	const spmLevel3 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyProgramManagement.id,
		level: 3,
		title: 'Professional'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: spmLevel3.id, description: 'Develop comprehensive safety programs independently, including policies and procedures' },
		{ competencyLevelId: spmLevel3.id, description: 'Implement risk mitigation strategies and adjust safety programs accordingly' },
		{ competencyLevelId: spmLevel3.id, description: 'Manage safety resources effectively, balancing priorities across different areas' },
		{ competencyLevelId: spmLevel3.id, description: 'Create and maintain safety performance indicators and prepare compliance reports' },
		{ competencyLevelId: spmLevel3.id, description: 'Develop tailboard topics relevant to current field operations' },
		{ competencyLevelId: spmLevel3.id, description: 'Implement safety initiatives that address specific field employee concerns' },
		{ competencyLevelId: spmLevel3.id, description: 'Conduct safety training sessions on specific program components' }
	  ]
	});
  
	// Level 4
	const spmLevel4 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyProgramManagement.id,
		level: 4,
		title: 'Role Model/Coach'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: spmLevel4.id, description: 'Guide team members in complex safety program development and implementation' },
		{ competencyLevelId: spmLevel4.id, description: 'Lead safety program reviews and lessons learned sessions to improve future planning' },
		{ competencyLevelId: spmLevel4.id, description: 'Optimize resource allocation across multiple safety initiatives to maximize effectiveness' },
		{ competencyLevelId: spmLevel4.id, description: 'Mentor others in developing accurate safety performance forecasts and reports' },
		{ competencyLevelId: spmLevel4.id, description: 'Guide field supervisors in conducting effective tailboard safety meetings' },
		{ competencyLevelId: spmLevel4.id, description: 'Lead safety stand-downs to address critical field safety issues' },
		{ competencyLevelId: spmLevel4.id, description: 'Design advanced safety training modules for high-risk activities' }
	  ]
	});
  
	// Level 5
	const spmLevel5 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyProgramManagement.id,
		level: 5,
		title: 'Expert'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: spmLevel5.id, description: 'Design strategic safety methodologies for high-stakes transmission and distribution projects' },
		{ competencyLevelId: spmLevel5.id, description: 'Innovate new approaches to safety program execution that improve efficiency and reduce incidents' },
		{ competencyLevelId: spmLevel5.id, description: 'Align safety initiatives with organizational strategy and industry best practices' },
		{ competencyLevelId: spmLevel5.id, description: 'Develop and implement cost-effective safety measures across multiple high-value projects' },
		{ competencyLevelId: spmLevel5.id, description: 'Design field-based safety technologies that enhance real-time risk assessment' },
		{ competencyLevelId: spmLevel5.id, description: 'Create industry-leading tailboard safety programs for transmission and distribution projects' },
		{ competencyLevelId: spmLevel5.id, description: 'Establish comprehensive safety curricula that address industry-wide challenges' }
	  ]
	});
  
	// 2. Incident Management and Investigation - Levels and Behaviors
	// Level 1
	const imiLevel1 = await prisma.competencyLevel.create({
	  data: {
		competencyId: incidentManagementInvestigation.id,
		level: 1,
		title: 'Novice'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: imiLevel1.id, description: 'Report observed safety incidents to supervisors' },
		{ competencyLevelId: imiLevel1.id, description: 'Assist in gathering basic information for incident reports' },
		{ competencyLevelId: imiLevel1.id, description: 'Participate in post-incident safety briefings' },
		{ competencyLevelId: imiLevel1.id, description: 'Follow established incident response protocols' },
		{ competencyLevelId: imiLevel1.id, description: 'Assist in gathering field evidence for incident investigations' },
		{ competencyLevelId: imiLevel1.id, description: 'Document initial observations from field incidents' },
		{ competencyLevelId: imiLevel1.id, description: 'Attend incident response training sessions' }
	  ]
	});
  
	// Level 2
	const imiLevel2 = await prisma.competencyLevel.create({
	  data: {
		competencyId: incidentManagementInvestigation.id,
		level: 2,
		title: 'Learner'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: imiLevel2.id, description: 'Conduct initial incident scene preservation and documentation' },
		{ competencyLevelId: imiLevel2.id, description: 'Assist in interviewing witnesses and collecting statements' },
		{ competencyLevelId: imiLevel2.id, description: 'Help identify immediate causes of incidents under supervision' },
		{ competencyLevelId: imiLevel2.id, description: 'Contribute to the development of corrective action plans' },
		{ competencyLevelId: imiLevel2.id, description: 'Conduct preliminary field interviews following minor incidents' },
		{ competencyLevelId: imiLevel2.id, description: 'Assist in recreating incident scenarios using field diagrams' },
		{ competencyLevelId: imiLevel2.id, description: 'Deliver basic incident prevention training to small groups' }
	  ]
	});
  
	// Level 3
	const imiLevel3 = await prisma.competencyLevel.create({
	  data: {
		competencyId: incidentManagementInvestigation.id,
		level: 3,
		title: 'Professional'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: imiLevel3.id, description: 'Lead incident investigations, including root cause analysis' },
		{ competencyLevelId: imiLevel3.id, description: 'Develop comprehensive incident reports with actionable recommendations' },
		{ competencyLevelId: imiLevel3.id, description: 'Implement and track corrective actions to prevent recurrence' },
		{ competencyLevelId: imiLevel3.id, description: 'Analyze incident trends and patterns to identify systemic issues' },
		{ competencyLevelId: imiLevel3.id, description: 'Lead on-site incident investigations in field settings' },
		{ competencyLevelId: imiLevel3.id, description: 'Conduct post-incident tailboard sessions to share lessons learned with field crews' },
		{ competencyLevelId: imiLevel3.id, description: 'Conduct training sessions on incident reporting and investigation procedures' }
	  ]
	});
  
	// Level 4
	const imiLevel4 = await prisma.competencyLevel.create({
	  data: {
		competencyId: incidentManagementInvestigation.id,
		level: 4,
		title: 'Role Model/Coach'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: imiLevel4.id, description: 'Guide complex incident investigations in high-risk environments' },
		{ competencyLevelId: imiLevel4.id, description: 'Mentor team members in advanced incident analysis techniques' },
		{ competencyLevelId: imiLevel4.id, description: 'Develop and improve incident investigation procedures and tools' },
		{ competencyLevelId: imiLevel4.id, description: 'Lead post-incident reviews and facilitate organizational learning' },
		{ competencyLevelId: imiLevel4.id, description: 'Design scenario-based training programs for field incident response and management' },
		{ competencyLevelId: imiLevel4.id, description: 'Mentor field supervisors in advanced incident analysis techniques' },
		{ competencyLevelId: imiLevel4.id, description: 'Create and deliver advanced training on root cause analysis and corrective action development' }
	  ]
	});
  
	// Level 5
	const imiLevel5 = await prisma.competencyLevel.create({
	  data: {
		competencyId: incidentManagementInvestigation.id,
		level: 5,
		title: 'Expert'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: imiLevel5.id, description: 'Design innovative incident prevention strategies for industry-wide application' },
		{ competencyLevelId: imiLevel5.id, description: 'Collaborate with regulatory agencies to improve incident reporting standards' },
		{ competencyLevelId: imiLevel5.id, description: 'Develop predictive incident analysis models using advanced data analytics' },
		{ competencyLevelId: imiLevel5.id, description: 'Influence organizational policies to foster a proactive safety culture' },
		{ competencyLevelId: imiLevel5.id, description: 'Create innovative field investigation methodologies that set industry standards' },
		{ competencyLevelId: imiLevel5.id, description: 'Establish best practices for field incident prevention in collaboration with industry partners' },
		{ competencyLevelId: imiLevel5.id, description: 'Develop industry-leading incident investigation and prevention training programs' }
	  ]
	});
  
	// 3. Compliance and Inspections - Levels and Behaviors
	// Level 1
	const ciLevel1 = await prisma.competencyLevel.create({
	  data: {
		competencyId: complianceInspections.id,
		level: 1,
		title: 'Novice'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: ciLevel1.id, description: 'Assist in conducting basic safety walkthroughs' },
		{ competencyLevelId: ciLevel1.id, description: 'Record observations during safety inspections' },
		{ competencyLevelId: ciLevel1.id, description: 'Maintain inspection checklists and documentation' },
		{ competencyLevelId: ciLevel1.id, description: 'Report obvious safety hazards to supervisors' },
		{ competencyLevelId: ciLevel1.id, description: 'Assist in conducting basic field safety walkthroughs' },
		{ competencyLevelId: ciLevel1.id, description: 'Record observations during tailboard safety meetings' },
		{ competencyLevelId: ciLevel1.id, description: 'Participate in compliance training sessions' }
	  ]
	});
  
	// Level 2
	const ciLevel2 = await prisma.competencyLevel.create({
	  data: {
		competencyId: complianceInspections.id,
		level: 2,
		title: 'Learner'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: ciLevel2.id, description: 'Conduct routine safety inspections under supervision' },
		{ competencyLevelId: ciLevel2.id, description: 'Identify common safety violations and non-compliance issues' },
		{ competencyLevelId: ciLevel2.id, description: 'Assist in preparing inspection reports and recommendations' },
		{ competencyLevelId: ciLevel2.id, description: 'Help track the implementation of corrective actions' },
		{ competencyLevelId: ciLevel2.id, description: 'Conduct routine field safety inspections under supervision' },
		{ competencyLevelId: ciLevel2.id, description: 'Identify common safety violations observed in the field' },
		{ competencyLevelId: ciLevel2.id, description: 'Deliver basic compliance training to small work groups' }
	  ]
	});
  
	// Level 3
	const ciLevel3 = await prisma.competencyLevel.create({
	  data: {
		competencyId: complianceInspections.id,
		level: 3,
		title: 'Professional'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: ciLevel3.id, description: 'Plan and execute comprehensive safety audits and inspections' },
		{ competencyLevelId: ciLevel3.id, description: 'Evaluate compliance with OSHA, DOT, and other relevant regulations' },
		{ competencyLevelId: ciLevel3.id, description: 'Develop detailed inspection reports with prioritized recommendations' },
		{ competencyLevelId: ciLevel3.id, description: 'Implement and monitor corrective action plans to address non-compliance' },
		{ competencyLevelId: ciLevel3.id, description: 'Conduct field-specific compliance audits for transmission and distribution projects' },
		{ competencyLevelId: ciLevel3.id, description: 'Develop tailored inspection protocols for different field environments' },
		{ competencyLevelId: ciLevel3.id, description: 'Conduct training sessions on regulatory compliance and inspection procedures' }
	  ]
	});
  
	// Level 4
	const ciLevel4 = await prisma.competencyLevel.create({
	  data: {
		competencyId: complianceInspections.id,
		level: 4,
		title: 'Role Model/Coach'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: ciLevel4.id, description: 'Design advanced inspection protocols for complex work environments' },
		{ competencyLevelId: ciLevel4.id, description: 'Mentor others in conducting thorough and effective safety inspections' },
		{ competencyLevelId: ciLevel4.id, description: 'Lead multi-disciplinary teams in comprehensive safety audits' },
		{ competencyLevelId: ciLevel4.id, description: 'Develop strategies to improve overall compliance and safety performance' },
		{ competencyLevelId: ciLevel4.id, description: 'Guide field teams in implementing best practices for safety compliance' },
		{ competencyLevelId: ciLevel4.id, description: 'Create field-specific training programs on compliance and inspection techniques' },
		{ competencyLevelId: ciLevel4.id, description: 'Design and deliver advanced compliance training programs for supervisors and managers' }
	  ]
	});
  
	// Level 5
	const ciLevel5 = await prisma.competencyLevel.create({
	  data: {
		competencyId: complianceInspections.id,
		level: 5,
		title: 'Expert'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: ciLevel5.id, description: 'Create innovative compliance management systems that set industry benchmarks' },
		{ competencyLevelId: ciLevel5.id, description: 'Collaborate with regulatory bodies to influence safety standards development' },
		{ competencyLevelId: ciLevel5.id, description: 'Design predictive compliance models using data analytics and trend analysis' },
		{ competencyLevelId: ciLevel5.id, description: 'Develop organization-wide strategies to foster a culture of proactive compliance' },
		{ competencyLevelId: ciLevel5.id, description: 'Pioneer advanced field inspection technologies for high-risk environments' },
		{ competencyLevelId: ciLevel5.id, description: 'Establish industry-leading compliance programs for transmission and distribution projects' },
		{ competencyLevelId: ciLevel5.id, description: 'Create cutting-edge training programs on transformational safety leadership and compliance' }
	  ]
	});
  
	// 4. Safety Data Analysis and Reporting - Levels and Behaviors
	// Level 1
	const sdarLevel1 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyDataAnalysisReporting.id,
		level: 1,
		title: 'Novice'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sdarLevel1.id, description: 'Collect basic safety data from various sources' },
		{ competencyLevelId: sdarLevel1.id, description: 'Enter safety information into designated databases or spreadsheets' },
		{ competencyLevelId: sdarLevel1.id, description: 'Assist in generating simple safety reports using templates' },
		{ competencyLevelId: sdarLevel1.id, description: 'Distribute routine safety performance updates to team members' },
		{ competencyLevelId: sdarLevel1.id, description: 'Gather field-specific safety data during site visits' },
		{ competencyLevelId: sdarLevel1.id, description: 'Record safety observations from tailboard meetings' },
		{ competencyLevelId: sdarLevel1.id, description: 'Attend training on basic data collection and reporting procedures' }
	  ]
	});
  
	// Level 2
	const sdarLevel2 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyDataAnalysisReporting.id,
		level: 2,
		title: 'Learner'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sdarLevel2.id, description: 'Compile safety statistics and metrics under supervision' },
		{ competencyLevelId: sdarLevel2.id, description: 'Create basic data visualizations to represent safety trends' },
		{ competencyLevelId: sdarLevel2.id, description: 'Assist in preparing monthly safety performance reports' },
		{ competencyLevelId: sdarLevel2.id, description: 'Identify data discrepancies and report them to supervisors' },
		{ competencyLevelId: sdarLevel2.id, description: 'Analyze field safety data to identify basic trends' },
		{ competencyLevelId: sdarLevel2.id, description: 'Prepare simple reports on field safety performance' },
		{ competencyLevelId: sdarLevel2.id, description: 'Deliver basic training on data entry and reporting procedures' }
	  ]
	});
  
	// Level 3
	const sdarLevel3 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyDataAnalysisReporting.id,
		level: 3,
		title: 'Professional'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sdarLevel3.id, description: 'Analyze complex safety data sets to identify trends and patterns' },
		{ competencyLevelId: sdarLevel3.id, description: 'Develop comprehensive safety performance dashboards and reports' },
		{ competencyLevelId: sdarLevel3.id, description: 'Interpret safety metrics to provide actionable insights to management' },
		{ competencyLevelId: sdarLevel3.id, description: 'Implement data quality control measures to ensure accuracy and reliability' },
		{ competencyLevelId: sdarLevel3.id, description: 'Conduct in-depth analysis of field-generated safety data' },
		{ competencyLevelId: sdarLevel3.id, description: 'Create field-specific safety performance indicators' },
		{ competencyLevelId: sdarLevel3.id, description: 'Conduct training sessions on safety data analysis and interpretation' }
	  ]
	});
  
	// Level 4
	const sdarLevel4 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyDataAnalysisReporting.id,
		level: 4,
		title: 'Role Model/Coach'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sdarLevel4.id, description: 'Design advanced safety analytics frameworks for large-scale projects' },
		{ competencyLevelId: sdarLevel4.id, description: 'Mentor team members in sophisticated data analysis techniques' },
		{ competencyLevelId: sdarLevel4.id, description: 'Lead the integration of predictive analytics in safety management' },
		{ competencyLevelId: sdarLevel4.id, description: 'Develop strategies to improve data-driven decision-making in safety' },
		{ competencyLevelId: sdarLevel4.id, description: 'Guide field teams in effective data collection and reporting practices' },
		{ competencyLevelId: sdarLevel4.id, description: 'Develop predictive models for field safety performance' },
		{ competencyLevelId: sdarLevel4.id, description: 'Create and deliver advanced training programs on safety data management and analysis' }
	  ]
	});
  
	// Level 5
	const sdarLevel5 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyDataAnalysisReporting.id,
		level: 5,
		title: 'Expert'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sdarLevel5.id, description: 'Create innovative safety data models that drive industry-wide improvements' },
		{ competencyLevelId: sdarLevel5.id, description: 'Collaborate with IT teams to develop cutting-edge safety analytics platforms' },
		{ competencyLevelId: sdarLevel5.id, description: 'Influence organizational strategy through data-driven safety insights' },
		{ competencyLevelId: sdarLevel5.id, description: 'Pioneer the use of artificial intelligence and machine learning in safety analytics' },
		{ competencyLevelId: sdarLevel5.id, description: 'Establish industry benchmarks for field safety data analysis and reporting' },
		{ competencyLevelId: sdarLevel5.id, description: 'Develop advanced predictive models for high-risk field operations' },
		{ competencyLevelId: sdarLevel5.id, description: 'Establish industry-leading training programs on advanced safety data analytics and predictive modeling' }
	  ]
	});
  
	// 5. Safety Communication and Culture - Levels and Behaviors
	// Level 1
	const sccLevel1 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyCommunicationCulture.id,
		level: 1,
		title: 'Novice'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sccLevel1.id, description: 'Distribute safety communications to team members' },
		{ competencyLevelId: sccLevel1.id, description: 'Participate in safety meetings and tailboard talks' },
		{ competencyLevelId: sccLevel1.id, description: 'Report safety concerns through appropriate channels' },
		{ competencyLevelId: sccLevel1.id, description: 'Assist in organizing safety awareness events' },
		{ competencyLevelId: sccLevel1.id, description: 'Attend safety culture training sessions' },
		{ competencyLevelId: sccLevel1.id, description: 'Support the preparation of materials for tailboard meetings' },
		{ competencyLevelId: sccLevel1.id, description: 'Participate in basic safety communication training' }
	  ]
	});
  
	// Level 2
	const sccLevel2 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyCommunicationCulture.id,
		level: 2,
		title: 'Learner'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sccLevel2.id, description: 'Prepare basic safety communications under supervision' },
		{ competencyLevelId: sccLevel2.id, description: 'Facilitate small group discussions on safety topics' },
		{ competencyLevelId: sccLevel2.id, description: 'Contribute ideas for improving safety engagement' },
		{ competencyLevelId: sccLevel2.id, description: 'Assist in developing safety awareness materials' },
		{ competencyLevelId: sccLevel2.id, description: 'Deliver basic safety culture presentations to peers' },
		{ competencyLevelId: sccLevel2.id, description: 'Conduct simple tailboard talks on routine safety topics' },
		{ competencyLevelId: sccLevel2.id, description: 'Deliver basic safety communication training to small groups' }
	  ]
	});
  
	// Level 3
	const sccLevel3 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyCommunicationCulture.id,
		level: 3,
		title: 'Professional'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sccLevel3.id, description: 'Develop and implement effective safety communication strategies' },
		{ competencyLevelId: sccLevel3.id, description: 'Lead safety meetings and facilitate open discussions on safety issues' },
		{ competencyLevelId: sccLevel3.id, description: 'Design and execute safety awareness campaigns' },
		{ competencyLevelId: sccLevel3.id, description: 'Measure and analyze safety culture indicators' },
		{ competencyLevelId: sccLevel3.id, description: 'Conduct training sessions on safety leadership and communication' },
		{ competencyLevelId: sccLevel3.id, description: 'Create engaging content for daily tailboard meetings' },
		{ competencyLevelId: sccLevel3.id, description: 'Develop and deliver comprehensive safety culture training programs' }
	  ]
	});
  
	// Level 4
	const sccLevel4 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyCommunicationCulture.id,
		level: 4,
		title: 'Role Model/Coach'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sccLevel4.id, description: 'Create comprehensive safety communication plans for complex projects' },
		{ competencyLevelId: sccLevel4.id, description: 'Mentor others in developing effective safety leadership skills' },
		{ competencyLevelId: sccLevel4.id, description: 'Lead initiatives to transform organizational safety culture' },
		{ competencyLevelId: sccLevel4.id, description: 'Develop strategies to improve employee engagement in safety programs' },
		{ competencyLevelId: sccLevel4.id, description: 'Design and deliver advanced safety culture training for management' },
		{ competencyLevelId: sccLevel4.id, description: 'Guide field supervisors in enhancing the effectiveness of tailboard meetings' },
		{ competencyLevelId: sccLevel4.id, description: 'Create and implement train-the-trainer programs for safety communication' }
	  ]
	});
  
	// Level 5
	const sccLevel5 = await prisma.competencyLevel.create({
	  data: {
		competencyId: safetyCommunicationCulture.id,
		level: 5,
		title: 'Expert'
	  }
	});
  
	await prisma.behavior.createMany({
	  data: [
		{ competencyLevelId: sccLevel5.id, description: 'Innovate industry-leading approaches to safety communication and culture change' },
		{ competencyLevelId: sccLevel5.id, description: 'Influence industry standards for safety leadership and cultural excellence' },
		{ competencyLevelId: sccLevel5.id, description: 'Develop predictive models for assessing and improving safety culture' },
		{ competencyLevelId: sccLevel5.id, description: 'Create strategies to align safety culture with overall organizational values' },
		{ competencyLevelId: sccLevel5.id, description: 'Establish cutting-edge training programs on transformational safety leadership' },
		{ competencyLevelId: sccLevel5.id, description: 'Pioneer innovative methods for fostering a strong safety culture in field operations' },
		{ competencyLevelId: sccLevel5.id, description: 'Design and implement comprehensive safety culture transformation programs' }
	  ]
	});
  
	console.log('Seed data creation completed successfully!');

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

// we're ok to import from the test directory in this file
/*
eslint
	no-restricted-imports: "off",
*/
