INSERT INTO Actions(Id, Origin, Name)
VALUES 
    (0, 'cc', 'Sharing'),
    (1, 'cc', 'DerivativeWorks'),
    (2, 'cc', 'Reproduce'),
    (3, 'cc', 'Distribution'),
    (4, 'cc', 'CommercialUse'),
    (5, 'cc', 'ShareAlike'),
    (6, 'cc', 'Attribution'),
    (7, 'cc', 'Inform'),
    (8, 'cc', 'Notice'),
    (9, 'jv', 'LinkLicense'),
    (10, 'jv', 'LinkDataSet'),
    (11, 'jv', 'LimitLicenseVersion'),
    (12, 'jv', 'ClaimWarranty'),
    (13, 'jv', 'ClaimLiability'),
    (14, 'jv', 'Endorse'),
    (15, 'jv', 'FreeAccess'),
    (16, 'jv', 'UninhibitedAccess'),
    (17, 'jv', 'ClaimMoralRights'),
    (18, 'jv', 'ClaimPublicity'),
    (19, 'jv', 'ClaimTrademark'),
    (20, 'jv', 'ClaimDataProtection'),
    (21, 'jv', 'ClaimPersonalityRights'),
    (22, 'jv', 'ClaimPatentRights'),
    (23, 'jv', 'ClaimCopyrightRights'),
    (24, 'jv', 'ClaimDesignRights'),
    (25, 'jv', 'ClaimPersonalData'),
    (26, 'jv', 'ClaimThirdPartyRights'),
    (27, 'jv', 'Relicense');


INSERT INTO Licenses (Id, Name, ShortName, SourceLink)
VALUES 
    (0, 'Creative Commons Attribution License 4.0', 'CC-BY-4.0', 'https://creativecommons.org/licenses/by/4.0/legalcode.de'),
    (1, 'Creative Commons Attribution-ShareAlike License 4.0', 'CC-BY-SA-4.0', 'https://creativecommons.org/licenses/by-sa/4.0/legalcode.de'),
    (2, 'Creative Commons Attribution-NoDerivatives License 4.0', 'CC-BY-ND-4.0', 'https://creativecommons.org/licenses/by-nd/4.0/legalcode.de'),
    (3, 'Creative Commons Attribution-NonCommercial License 4.0', 'CC-BY-NC-4.0', 'https://creativecommons.org/licenses/by-nc/4.0/legalcode.de'),
    (4, 'Creative Commons Attribution-NonCommercial-ShareAlike License 4.0', 'CC-BY-NC-SA-4.0', 'https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.de'),
    (5, 'Creative Commons Attribution-NonCommercial-NoDerivatives License 4.0', 'CC-BY-NC-ND-4.0', 'https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.de'),
    (6, 'Creative Commons Zero', 'CC0', 'https://creativecommons.org/publicdomain/zero/1.0/legalcode.de'),
    (7, 'Open Data Commons Attribution License v1.0', 'ODC-By-1.0', 'https://opendatacommons.org/licenses/by/1-0/'),
    (8, 'Open Data Commons Public Domain Dedication and License v1.0', 'PDDL-1.0', 'https://opendatacommons.org/licenses/pddl/1-0/'),
    (9, 'Open Data Commons Open Database License v1.0', 'ODbL-1.0', 'https://opendatacommons.org/licenses/odbl/1-0/'),
    (10, 'Data licence Germany - attribution - version 2.0', 'DL-DE-BY-2.0', 'https://www.govdata.de/dl-de/by-2-0'),
    (11, 'Data licence Germany - Zero - Version 2.0', 'DL-DE-ZERO-2.0', 'https://www.govdata.de/dl-de/zero-2-0'),
    (12, 'Open Government License (for Public Sector Information)', 'OGL-UK-3.0', 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'),
    (13, 'Singapore Open Data License', NULL, 'https://beta.data.gov.sg/open-data-license'),
    (14, 'Open License', 'etalab-2.0', 'https://www.etalab.gouv.fr/wp-content/uploads/2014/05/Open_Licence.pdf'),
    (15, 'Norwegian Licence for Open Government Data 2.0', 'NLOD-2.0', 'https://data.norge.no/nlod/en/2.0'),
    (16, 'Open Use of Data Agreement v1.0', 'O-UDA-1.0', 'https://cdla.dev/open-use-of-data-agreement-v1-0/'),
    (17, 'Community Data License Agreement - Permissive - Version 2.0', 'CDLA-Permissive-2.0', 'https://cdla.dev/permissive-2-0/'),
    (18, 'Community Data License Agreement - Sharing - Version 1.0', 'CDLA-Sharing-1.0', 'https://cdla.dev/sharing-1-0/');

/*Permissions, Prohibitions and Duties for CC-BY-4.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (0, 0),
    (0, 1),
    (0, 2),
    (0, 3),
    (0, 4),
    (0, 15),
    (0, 16),
    (0, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (0,12),
    (0,13),
    (0,14),
    (0,17),
    (0,19),
    (0,21),
    (0,22),
    (0,23);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (0,6),
    (0,7),
    (0,8),
    (0,9),
    (0,10);

/*Permissions, Prohibitions and Duties for CC-BY-SA-4.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (1, 0),
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 15),
    (1, 16),
    (1, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (1,12),
    (1,13),
    (1,14),
    (1,17),
    (1,19),
    (1,21),
    (1,22),
    (1,23);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (1,5),
    (1,6),
    (1,7),
    (1,8),
    (1,9),
    (1,10);

/*Permissions, Prohibitions and Duties for CC-BY-ND-4.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (2, 0),
    (2, 2),
    (2, 3),
    (2, 4),
    (2, 15),
    (2, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (2, 1),
    (2,12),
    (2,13),
    (2,14),
    (2,17),
    (2,19),
    (2,21),
    (2,22),
    (2,23);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (2,6),
    (2,7),
    (2,8),
    (2,9),
    (2,10);

/*Permissions, Prohibitions and Duties for CC-BY-NC-4.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (3, 0),
    (3, 1),
    (3, 2),
    (3, 3),
    (3, 15),
    (3, 16),
    (3, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (3, 4),
    (3,12),
    (3,13),
    (3,14),
    (3,17),
    (3,19),
    (3,21),
    (3,22),
    (3,23),
    (3,27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (3,6),
    (3,7),
    (3,8),
    (3,9),
    (3,10);

/*Permissions, Prohibitions and Duties for CC-BY-NC-SA-4.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (4, 0),
    (4, 1),
    (4, 2),
    (4, 3),
    (4, 15),
    (4, 16),
    (4, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (4, 4),
    (4,12),
    (4,13),
    (4,14),
    (4,17),
    (4,19),
    (4,21),
    (4,22),
    (4,23);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (4,5),
    (4,6),
    (4,7),
    (4,8),
    (4,9),
    (4,10);

/*Permissions, Prohibitions and Duties for CC-BY-NC-ND-4.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (5, 0),
    (5, 2),
    (5, 3),
    (5, 15),
    (5, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (5, 1),
    (5, 4),
    (5,12),
    (5,13),
    (5,14),
    (5,17),
    (5,19),
    (5,21),
    (5,22),
    (5,23),
    (5,27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (5,6),
    (5,7),
    (5,8),
    (5,9),
    (5,10);

/*Permissions, Prohibitions and Duties for CC0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (6, 0),
    (6, 1),
    (6, 2),
    (6, 3),
    (6, 4),
    (6, 14),
    (6, 15),
    (6, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (6,12),
    (6,13),
    (6,19),
    (6,22);

/*Permissions, Prohibitions and Duties for ODC-BY-1.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (7, 0),
    (7, 1),
    (7, 2),
    (7, 3),
    (7, 4),
    (7, 15),
    (7, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (7,12),
    (7,13),
    (7,20),
    (7,21),
    (7,22),
    (7,23),
    (7,27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (7,6),
    (7,8),
    (7,9),
    (7,10);

/*Permissions, Prohibitions and Duties for ODC-PDDL-1.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (8, 0),
    (8, 1),
    (8, 2),
    (8, 3),
    (8, 4),
    (8, 14),
    (8, 15),
    (8, 16),
    (8, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (8,12),
    (8,13),
    (8,19),
    (8,22);

/*Permissions, Prohibitions and Duties for ODC-ODbL-1.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (9, 0),
    (9, 1),
    (9, 2),
    (9, 3),
    (9, 4),
    (9, 15),
    (9, 16),
    (9, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (9,12),
    (9,13),
    (9,20),
    (9,21),
    (9,22),
    (9,23);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (9,5),
    (9,6),
    (9,8),
    (9,9),
    (9,10);

/*Permissions, Prohibitions and Duties for DL-DE->BY-2.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (10, 0),
    (10, 1),
    (10, 2),
    (10, 3),
    (10, 4);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (10, 27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (10, 6),
    (10, 7),
    (10, 9),
    (10, 10);

/*Permissions, Prohibitions and Duties for DL-DE->ZERO-2.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (11, 0),
    (11, 1),
    (11, 2),
    (11, 3),
    (11, 4);
    

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (11, 27);

/*Permissions, Prohibitions and Duties for Open Government License*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (12, 0),
    (12, 1),
    (12, 2),
    (12, 3),
    (12, 4),
    (12, 15),
    (12, 16),
    (12, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (12, 12),
    (12, 13),
    (12, 14),
    (12, 19),
    (12, 22),
    (12, 24),
    (12, 25),
    (12, 26);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (12, 6),
    (12, 7),
    (12, 8),
    (12, 9),
    (12, 10);

/*Permissions, Prohibitions and Duties for Singapure Open Data License*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (13, 0),
    (13, 1),
    (13, 2),
    (13, 3),
    (13, 4),
    (13, 15),
    (13, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (13, 12),
    (13, 13),
    (13, 14),
    (13, 19),
    (13, 22),
    (13, 24),
    (13, 25),
    (13, 26),
    (13, 27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (13, 9),
    (13, 10);

/*Permissions, Prohibitions and Duties for License Ouverte*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (14, 0),
    (14, 1),
    (14, 2),
    (14, 3),
    (14, 4),
    (14, 15),
    (14, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (14, 12),
    (14, 13),
    (14, 14);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (14, 6),
    (14, 9),
    (14, 10);

/*Permissions, Prohibitions and Duties for NLOD-2.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (15, 0),
    (15, 1),
    (15, 2),
    (15, 3),
    (15, 5),
    (15, 11),
    (15, 15),
    (15, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (15, 12),
    (15, 13),
    (15, 14),
    (15, 19),
    (15, 22),
    (15, 23),
    (15, 24),
    (15, 25),
    (15, 26),
    (15, 27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (15, 6),
    (15, 7),
    (15, 9),
    (15, 10),
    (15, 11);

/*Permissions, Prohibitions and Duties for O-UDA-1.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (16, 0),
    (16, 1),
    (16, 2),
    (16, 3),
    (16, 4),
    (16, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (16, 12),
    (16, 13);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (16, 6),
    (16, 7),
    (16, 8),
    (16, 9),
    (16, 10);

/*Permissions, Prohibitions and Duties for CDLA-Permissive-2.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (17, 0),
    (17, 1),
    (17, 2),
    (17, 3),
    (17, 27);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (17, 12),
    (17, 13);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (17, 9);

/*Permissions, Prohibitions and Duties for CDLA-Sharing-1.0*/
INSERT INTO Permissions(LicenseId, ActionId)
VALUES 
    (18, 0),
    (18, 1),
    (18, 2),
    (18, 3),
    (18, 15),
    (18, 16);

INSERT INTO Prohibitions(LicenseId, ActionId)
VALUES
    (18, 12),
    (18, 13),
    (18, 14),
    (18, 27);

INSERT INTO Duties(LicenseId, ActionId)
VALUES
    (18, 6),
    (18, 7),
    (18, 8),
    (18, 9),
    (18, 10);