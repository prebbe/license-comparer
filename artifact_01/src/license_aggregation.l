@Engine("sqlite");
@DefineFlag("database_file");
@AttachDatabase("db", "${database_file}");
# @AttachDatabase("db", "data/backend.sqlite");

# Predicate LicensePermissions -> Aggregates the actions a license permits
LicensePermission(license_name:, action_name:) distinct :- 
    licenses(id: license_id, name:license_name), 
    actions(id:action_id, name: action_name), 
    permissions(actionid:permissions_action_id, licenseid: permissions_license_id), 
    (license_id ==permissions_license_id, action_id == permissions_action_id);

LicensePermissions(license_name:, action_names? List= action_name) distinct :- 
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

Licenses(license_name:, permissions:, prohibitions:, duties:) :-
    LicensePermissions(license_name:, action_names: permissions),
    LicenseProhibitions(license_name:, action_names: prohibitions),
    LicenseDuties(license_name:, action_names: duties) | duties == [];

# Predicate ComnbinedLicensePermissions -> Aggregates the actions that two license allow by conjunction
CombinedLicensePermissions(license_name_1: , license_name_2:, combined_action_names? List=action_name ) distinct :-
    LicensePermission(license_name: license_name_1, action_name: action_name),
    LicensePermission(license_name: license_name_2, action_name: action_name);

# Predicate CombinedLicenseProhibitions -> Aggregates the actions that two licenses prohibit by disjunction
CombinedLicenseProhibitions(license_name_1:, license_name_2:, combined_action_names? List=action_name ) distinct :-
    licenses(id: license_id_1, name:license_name_1), 
    licenses(id: license_id_2, name:license_name_2), 
    actions(id:action_id, name: action_name), 
    prohibitions(actionid:prohibitions_action_id, licenseid: prohibitions_license_id), 
    ((license_id_1 == prohibitions_license_id || license_id_2 == prohibitions_license_id) && action_id == prohibitions_action_id);

# Predicate CombinedLicenseDuties -> Aggregates the actions that two licenses require by disjunction
CombinedLicenseDuties(license_name_1: , license_name_2:, combined_action_names? List=action_name ) distinct :-
    licenses(id: license_id_1, name:license_name_1), 
    licenses(id: license_id_2, name:license_name_2), 
    actions(id:action_id, name: action_name), 
    duties(actionid:duties_action_id, licenseid: duties_license_id), 
    ((license_id_1 == duties_license_id || license_id_2 == duties_license_id) && action_id == duties_action_id);

# Predicate PrunedLicensePermissions -> Aggregates the permissions that are not prohibited by the other license
PrunedLicensePermissions(license_name_1:, license_name_2:, pruned_action_names: ) distinct :-
    CombinedLicensePermissions(license_name_1: , license_name_2:, combined_action_names: pruned_action_names),
    ~CombinedLicenseProhibitions(license_name_1: , license_name_2:, combined_action_names: pruned_action_names);

# Predicate AggregatedLicenses -> Determines the permissions, prohibitions and duties that the combination of two licenses has to fulfill
AggregatedLicenses(license_name_1:, license_name_2:, permissions:, prohibitions:, duties:) :-
    PrunedLicensePermissions(license_name_1:, license_name_2:, pruned_action_names: permissions),
    CombinedLicenseProhibitions(license_name_1:, license_name_2:, combined_action_names: prohibitions),
    CombinedLicenseDuties(license_name_1:, license_name_2:, combined_action_names: duties);