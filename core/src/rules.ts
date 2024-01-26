import { matchExactly, matchPartially } from "./helpers";

import { License, LicenseAction, LicenseSummary, ShareAlikes } from "./types";

class Rules {
    static permissionsAreCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let match = matchExactly(license1.permissions, license2.permissions);
    
        return match;
    }

    static prohibitionsAndPermissionsAreCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let match1 = matchPartially(license1.permissions, license2.prohibitions);
        let match2 = matchPartially(license2.permissions, license1.prohibitions);
    
        return !match1 && !match2;
    }

    static prohibitionsAndDutiesAreCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let match1 = matchPartially(license1.duties, license2.prohibitions);
        let match2 = matchPartially(license2.duties, license1.prohibitions);
    
        return !match1 && !match2;
    }

    static permissionsArePartiallyCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let match = matchPartially(license1.permissions, license2.permissions);
    
        return match;
    }

    static prohibitionsAndPermissionsArePartiallyCompatible(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1 === null || license2 === null)
            return false;

        let match1 = matchExactly(license1.permissions, license2.prohibitions);
        let match2 = matchExactly(license2.permissions, license1.prohibitions);
    
        return !match1 && !match2;
    }

    static conformToShareAlike(license1: LicenseSummary, license2: LicenseSummary): boolean {
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

    private static requiresShareAlikeCheck(duties: LicenseAction[]): boolean {
        return duties.findIndex((duty) => duty.id === 5) >= 0;
    }

    private static containsShareAlike(shareAlikes: ShareAlikes[], id: number): boolean {
        return shareAlikes.findIndex((shareAlike: ShareAlikes) => shareAlike.licenseId2 == id) >= 0;
    }

    static conformToRelicense(license1: LicenseSummary, license2: LicenseSummary): boolean {
        let isTheSameLicense = (license1.metaInformation.id === license2.metaInformation.id);
    
        if (isTheSameLicense)
            return true;

        let license1AllowsRelicensing = this.containsRelicensing(license1.permissions) && !this.containsRelicensing(license1.prohibitions);
        let license2AllowsRelicensing = this.containsRelicensing(license2.permissions) && !this.containsRelicensing(license2.prohibitions);

        return license1AllowsRelicensing && license2AllowsRelicensing;
    }
    
    private static containsRelicensing(actions: LicenseAction[]): boolean {
        return actions.findIndex((action: LicenseAction) => action.id === 27) >= 0;
    }
}

export { Rules }