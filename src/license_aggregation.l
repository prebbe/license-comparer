@Engine("sqlite");
@DefineFlag("database_file");
@AttachDatabase("db", "data/backend.sqlite");

# Predicate LicensePermissions -> Aggregates the actions a license permits
LicensePermissions(license_name:, action_name:) distinct :- 
    licenses(id: license_id, name:license_name), 
    actions(id:action_id, name: action_name), 
    permissions(actionid:permissions_action_id, licenseid: permissions_license_id), 
    (license_id ==permissions_license_id, action_id == permissions_action_id);

# Predicate LicenseProhibitions -> Aggregates the actions a license prohibits
LicenseProhibitions(license_name:, action_names? List= action_name) distinct :-
    licenses(id: license_id, name:license_name), 
    actions(id: action_id, name: action_name),
    prohibitions(actionid: prohibitions_action_id, licenseid: prohibitions_license_id),
    (license_id == prohibitions_license_id, action_id == prohibitions_action_id);

# Predicate LicenseDuties -> Aggregates the actions a license requires
LicenseDuties(license_name:, action_names? List= action_name) distinct :-
    licenses(id: license_id, name:license_name),
    actions(id:action_id, name: action_name),
    duties(actionid:duties_action_id, licenseid: duties_license_id),
    (license_id == duties_license_id, action_id == duties_action_id);

# Predicate ComnbinedLicensePermissions -> Aggregates the actions that two license allow by conjunction
CombinedLicensePermissions(license_name_1: , license_name_2:, combined_action_names? List=action_name ) distinct :-
    (license_name_1 != license_name_2),
    LicensePermissions(license_name: license_name_1, action_name: action_name_1),
    LicensePermissions(license_name: license_name_2, action_name: action_name_2),
    (action_name_1 == action_name_2, action_name == action_name_1);

# Predicate CombinedLicenseProhibitions -> Aggregates the actions that two licenses prohibit by disjunction
CombinedLicenseProhibitions(license_name_1:, license_name_2:, combined_action_names:) distinct :-
    (license_name_1 != license_name_2),
    LicenseProhibitions(license_name: license_name_1, action_names: action_names_1),
    LicenseProhibitions(license_name: license_name_2, action_names: action_names_2),
    combined_action_names == action_names_1 | combined_action_names == action_names_2;

# Predicate CombinedLicenseDuties -> Aggregates the actions that two licenses require by disjunction
CombinedLicenseDuties(license_name_1: , license_name_2:, combined_action_names: ) distinct :-
    (license_name_1 != license_name_2),
    LicenseDuties(license_name: license_name_1, action_names: action_names_1),
    LicenseDuties(license_name: license_name_2, action_names: action_names_2),
    combined_action_names == action_names_1 | combined_action_names == action_names_2;

# Predicate PrunedLicensePermissions -> Aggregates the permissions that are not prohibited by the other license
PrunedLicensePermissions(license_name_1:, license_name_2:, pruned_action_names: ) distinct :-
    (license_name_1 != license_name_2),
    CombinedLicensePermissions(license_name_1: , license_name_2:, combined_action_names: pruned_action_names),
    ~CombinedLicenseProhibitions(license_name_1: , license_name_2:, combined_action_names: pruned_action_names);

# Predicate AggregatedLicense -> Determines the permissions, prohibitions and duties that the combination of two licenses has to fulfill
AggregatedLicense(license_name_1:, license_name_2:, permissions:, prohibitions:, duties:) :-
    PrunedLicensePermissions(license_name_1:, license_name_2:, pruned_action_names: permissions),
    CombinedLicenseProhibitions(license_name_1:, license_name_2:, combined_action_names: prohibitions),
    CombinedLicenseDuties(license_name_1:, license_name_2:, combined_action_names: duties);