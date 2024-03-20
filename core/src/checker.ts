import Action from "./entities/Action";
import CompatibilityCheckResult from "./entities/CompatibilityCheckResult";
import License from "./entities/License";
import { isSubsetOf, join, areDistinct } from "./helpers";

class Checker {
    private static permissionsAreLessRestrictive(license1: License, license2: License) : boolean {
        let permissionsAreSubset = isSubsetOf(license1.permissions, license2.permissions);

        let permissionsAreNotRestricted = areDistinct(license1.permissions, license2.prohibitions) && 
                                        areDistinct(license1.permissions, license2.duties);

        return permissionsAreSubset && permissionsAreNotRestricted;
    }

    private static prohibitionsAreLessRestrictive(license1: License, license2: License) : boolean {
        let prohibitionsAreSubset = isSubsetOf(license1.prohibitions, license2.prohibitions);

        let prohibitionsAreNotRestricted = areDistinct(license1.prohibitions, license2.permissions) && 
                                        areDistinct(license1.prohibitions, license2.duties);

        return prohibitionsAreSubset && prohibitionsAreNotRestricted;
    }

    private static dutiesAreLessRestrictive(license1: License, license2: License) : boolean {
        let dutiesAreSubset = isSubsetOf(license1.duties, license2.duties);

        let dutiesAreNotRestricted = areDistinct(license1.duties, license2.permissions) && 
                                        areDistinct(license1.duties, license2.prohibitions);

        return dutiesAreSubset && dutiesAreNotRestricted;
    }

    private static allowsRelicensing(license: License): boolean {
        return license.permissions.findIndex((action: Action) => action.id === 27) >= 0;
    }

    static isLessRestrictive(license1: License, license2: License) : boolean {
        // Check the permissions
        let permissionsAreLessRestrictive = this.permissionsAreLessRestrictive(license1, license2);

        // Check the prohibitions
        let prohibitionsAreLessRestrictive = this.prohibitionsAreLessRestrictive(license1, license2);

        // Check the duties
        let dutiesAreLessRestrictive = this.dutiesAreLessRestrictive(license1, license2);

        // Allows relicensing
        let allowsRelicensing = this.allowsRelicensing(license1);

        return permissionsAreLessRestrictive && 
            prohibitionsAreLessRestrictive &&
            dutiesAreLessRestrictive &&
            allowsRelicensing;
    }

    private static haveCommonPermissions(license1: License, license2: License): boolean {
        let permissionsAreDistinct = areDistinct(license1.permissions, license2.permissions);

        return permissionsAreDistinct === false;
    }

    private static dutiesAreNotProhibited(license1: License, license2: License): boolean {
        let dutiesAreNotProhibited = join(license1.duties, license2.prohibitions).length == 0;

        return dutiesAreNotProhibited;
    }

    private static bothAllowRelicense(license1: License, license2: License): boolean {
        return this.allowsRelicensing(license1) && this.allowsRelicensing(license2);
    }

    private static canBeComposed(license1: License, license2: License): boolean {
        let haveCommonPermissions = this.haveCommonPermissions(license1, license2);
        let dutiesAreNotProhibited = this.dutiesAreNotProhibited(license1, license2);
        let bothAllowRelicense = this.bothAllowRelicense(license1, license2);

        return haveCommonPermissions && dutiesAreNotProhibited && bothAllowRelicense;
    }

    private static requiresShareAlikeCheck(duties: Action[]): boolean {
        return duties.findIndex((duty) => duty.id === 5) >= 0;
    }

    private static containsShareAlike(shareAlikes: number[], id: number): boolean {
        return shareAlikes.findIndex((shareAlike: number) => shareAlike == id) >= 0;
    }

    private static areShareAlikeConform(license1: License, license2: License) {
        let l1requiresShareAlike = this.requiresShareAlikeCheck(license1.duties);
        let l2requiresShareAlike = this.requiresShareAlikeCheck(license2.duties);

        if (!l1requiresShareAlike && !l2requiresShareAlike) {
            return true;
        }

        let l1Conforms = true;
        let l2Conforms = true;
        if (l1requiresShareAlike) {
            l1Conforms = this.containsShareAlike(license1.shareAlikes, license2.metaInformation.id);
        }

        if (l2requiresShareAlike) {
            l2Conforms = this.containsShareAlike(license2.shareAlikes, license1.metaInformation.id);
        }
        
        return l1Conforms && l2Conforms;
    }

    static AreCompatible(license1: License, license2: License): CompatibilityCheckResult {
        let license1IsLessRestrictive = this.isLessRestrictive(license1, license2);
        let license2IsLessRestrictive = this.isLessRestrictive(license2, license1);

        let canBeComposed = license1IsLessRestrictive || license2IsLessRestrictive;
        if (license1IsLessRestrictive === false && license2IsLessRestrictive === false) {
            canBeComposed = this.canBeComposed(license1, license2);
        }

        let areShareAlikeConform = this.areShareAlikeConform(license1, license2);

        return {
            restrictivenessCheck1: license1IsLessRestrictive,
            restrictivenessCheck2: license2IsLessRestrictive,
            canBeComposed: canBeComposed,
            areShareAlikeConform: areShareAlikeConform,
        };
    }
}

export default Checker;