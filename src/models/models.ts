export interface user{
    _id: string,
    userName: string,
    userRole: string,
    email: string,
    password?: string,
    hospitals?: hospital[],
    units?: unit[]

}

export interface hospital {
    _id: string,
    hospitalName: string
}

export interface unit {
    _id: string,
    hospitalName: string,
    unitName: string,
}

export interface patient {
    _id: string,
    patientId: string,
    latestTime: string,
    admission: admission,
    preadmissionfollowup: preadmissionfollowup,
    cormorbiditiesandriskfactors: cormorbiditiesandriskfactors,
    interventionpci: interventionpci,
    interventionthrombolysis: interventionthrombolysis,
    discharge: discharge
}

export interface admission {
    patientId: string,
    patientName?: string,
    gender?: string,
    age?: string,
    nic?: string,
    contactNumber?: string,
    dateOfHospitalArrival?: string,
    timeOfHospitalArrival?: string,
    modeOfTransportation?: string,
    transferredFrom?: string,
    pciOrThrombolysis?: string,
    cprGiven?: string,
    raisedJvp?: string,
    numberOfVasoDrugs?: string,
    ecgReferral?: string,
    dateOfChestPainOnset?: string,
    timeOfChestPainOnset?: string,
    analgesiaGiven?: string,
    admittedFor?: string,
    reinfarction?: string,
    createdTime?: string
}

export interface observations {
    patientId: string,
    obsDate?: string,
    obsTime?: string,
    serumCreatinine: string,
    unitOfSerumCreatinine?: string,
    systolicBloodPressure?: string,
    diastolicBloodPressure?: string,
    respiratoryRate?: string,
    heartRate?: string,
    troponin?: string,
    
}

export interface preadmissionfollowup {
    
    patientId: string,
    mobilityEq1?: string,
    selfCareEq2?: string,  
    usualActivities?: string,
    painDiscomfortEq4?: string,
    anxietyDepressionEq5?: string,
    howAboutYourHealthToday?: string,
    dressingYourself?: string,
    walkingIndoorsOnLevelGround?: string,
    showering?: string,
    climbingAHillOrAFligh?: string,
    gardeningVacuumingOrCar?: string,
    walkingMoreThanABlock?: string,
    runningOrJogging?: string,
    liftingOrMovingHeavyOb?: string,
    participatingInStrenuous?: string
    
}

export interface cormorbiditiesandriskfactors {
    
    patientId: string,
    
}

export interface interventionpci {
    
    patientId: string,
    
}

export interface interventionthrombolysis {
    
    patientId: string,
    
}

export interface discharge {
    
    patientId: string,
    
}

/*

mobilityEq1					Mobility (EQ-1)

selfCareEq2					Self care (EQ-2)

usualActivities				Usual Activities (e.g. work, study, housework, family or leisure activities) (EQ-3)

painDiscomfortEq4			Pain/Discomfort (EQ-4)

anxietyDepressionEq5			Anxiety/Depression (EQ-5)

howAboutYourHealthToday		How about your health today? 	

			

dressingYourself		Dressing yourself	

walkingIndoorsOnLevelGround		Walking indoors on level ground		

showering			Showering	

climbingAHillOrAFligh		Climbing a hill or a flight of stairs without stopping		

gardeningVacuumingOrCar		Gardening, vacuuming, or carrying groceries		

walkingMoreThanABlock		Walking more than a block at a brisk pace		

runningOrJogging		Running or jogging	

liftingOrMovingHeavyOb		Lifting or moving heavy objects		

participatingInStrenuous	Participating in strenuous sports (e.g. swimming, running, cricket)	


*/