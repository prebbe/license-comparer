# First Draft for compatibility analysis in first-order-logic
## Basic rules
Let's start with some basic predicates. These predicates describe if an action a is allowed, prohibited and required by a license l:
$$Permits(l,a) with l ∈ L, a ∈ A$$
$$Prohibits(l,a) with l ∈ L, a ∈ A$$
$$Requires(l,a) with l ∈ L, a ∈ A$$

$Permits$ and $Requires$ should always default to $false$ to ensure that no permissions or duties, that are not even there are enforced. $Prohibits$ should always default to $true$, since no action is allowed if no permissions or duties are mentioned in a license.

If something is permitted or required by a license, it is atomatically not prohibited:
$$Permits(L,A) ⇒ ¬Prohibits(L,A)$$
$$Requires(L,A) ⇒ ¬Prohibits(L,A)$$

These rules cannot be reversed, since it cannot be decided if the action is permitted or required without additional evidence.

Two licenses have the same value for a permission, if the predicate $Permits$ does or does not hold for both of them with the same action:
$$BothPermit(L1,L2,A) ⇒ ((Permits(L1,A) ∧ Permits(L2,A)) ∨ (¬Permits(L1,A) ∧ ¬Permits(L2,A)))$$
Same goes for the prohibitions and the duties of two licenses. If the predicate $Prohibits$ or respectively $Requires$ does or does not hold for both licenses given the same action, it means that the action is prohibited / required by both licenses:
$$BothProhibit(L1,L2,A) ⇒ (Prohibits(L1,A) ∧ Prohibits(L2,A)) ∨ (¬Prohibits(L1,A) ∧ ¬Prohibits(L2,A))$$
$$BothRequire(L1,L2,A) ⇒ (Requires(L1,A) ∧ Requires(L2,A)) ∨ (¬Requires(L1,A) ∧ ¬Requires(L2,A))$$

With these predicates, we can model the case, that two licenses are completely equal:
$$AreEqual(L1,L2) ⇒ ∀a.(BothPermit(L1,L2,a) ∧ BothProhibit(L1,L2,a) ∧ BothRequire(L1,L2,a)$$

If this statement holds the two licenses are equal and compatible. But another case could be that two licenses have only some commonalities. To model this case, we need more predicates. The first one is necessary to model the partial equality. 
$$ArePartiallyEqual(L1,L2) ⇒ ∃a.BothPermit(L1,L2,a) ∧ ∃b.BothProhibit(L1,L2,b) ∧ ∃c.BothRequire(L1,L2,c)$$

If two licenses are partially compatible, we have to check if the duties of one license are prohibited by the other license. 
$$ProhibitionCancelsPermit(L1,L2,A) ⇒ (Permits(L1,A) ∧ Prohibits(L2,A) ∨ (Prohibits(L1,A) ∧ Permits(L2,A))$$
$$ProhibitionCancelsDuty(L1,L2,A) ⇒ (Requires(L1,A) ∧ Prohibits(L2,A) ∨ (Prohibits(L1,A) ∧ Requires(L2,A))$$

This results in the following predicate for partial compatibility:
$$ArePartiallyCompatibleIncomplete(L1, L2) ⇒ ArePartiallyEqual(L1, L2) ∧ ∀a.(¬ProhibitionsCancelsPermit(L1, L2, a) ∧ ¬ProhibitionCancelsDuty(L1, L2, a))$$

Given the previous predicate holds, it should be possible to generate an aggregated license that combines the permissions, prohibitions and duties of both licenses. But there are some rules that require some additional attention.

## Share-Alike
First this action requires that you are allowed to relicense:
$$Requires(L, ShareAlike) ⇒ Permits(L, Relicensing)$$
Second this adds some requirements to the previously mentioned Predicate $ArePartiallyCompatibleIncomplete$. If you want to relicense under the rules of ShareAlike, you have to use the same type of license, that was used to license the source. So $AreEqual$ should work for this.
However this could lead to some other licenses being accepted as compatible. Most Share-Alike licenses define a short set of licenses that can be used to relicense the source-content (e.g. CC-BY-SA & CC-BY-SA-NC). These lists are normally very short. So to make sure that we only classify these allowed licenses as compatible, we should add a new predicate:
$$AreAlike(l1, l2) with l1, l2 ∈ L$$

This Predicate should only hold if both licenses are defined as being valid licenses to conform to Share-Alike. 

$$ConformsToShareAlike(L1, L2) ⇒ (¬Requires(L1, ShareAlike) ∧ ¬Requires(L2, ShareAlike)) ∨ ((Requires(L1, ShareAlike) ∨ Requires(L2, ShareAlike)) ∧ AreAlike(L1, L2))$$

## Predicates for full compatibility
Two licenses being fully compatible means, that both licenses have the same permissions, prohibitions and duties:
$$PermissionsAreFullyCompatible(L1, L2) ⇒ ∀a.BothPermit(L1,L2,a)$$
$$ProhibitionsAllowAllPermissions(L1,L2) ⇒ ∀a.¬AreEqual(Permits(L1,a), Prohibits(L2,a)) ∧ ∀b.¬AreEqual(Permits(L2,b), Prohibits(L1,b))$$
$$ProhibitionsAllowAllDuties(L1,L2) ⇒ ∀a.¬AreEqual(Duties(L1,a), Prohibits(L2,a)) ∧ ∀b.¬AreEqual(Duties(L2,b), Prohibits(L1,b))$$
$$AreFullyCompatible(L1,L2) ⇒ PermissionsAreFullyCompatible(L1,L2) ∧ ProhibitionsAllowAllPermissions(L1,L2) ∧ ProhibitionsAllowAllDuties(L1,L2) ∧ ConformsToShareAlike(L1, L2)$$

## Predicates for partial compatibility
$$PermissionsArePartiallyCompatible(L1, L2) ⇒ ∃a.(AreEqual(Permits(L1,a), Permits(L2,a)))$$
$$ProhibitionsAllowSomePermissions(L1,L2) ⇒ ∀a∃b.(¬AreEqual(Permits(L1,a), Prohibits(L2,b)) ∧ a == b) ∧ ∀c∃d.¬AreEqual(Permits(L2,c), Prohibits(L1,d) ∧ c == d)$$
$$ProhibitionsAllowSomeDuties(L1,L2) ⇒ ∀a∃b.(¬AreEqual(Duties(L1,a), Prohibits(L2,b)) ∧ a == b) ∧ ∀c∃d.¬AreEqual(Duties(L2,c), Prohibits(L1,d) ∧ c == d)$$
$$ArePartiallyCompatible(L1,L2) ⇒ (PermissionsAreFullyCompatible(L1,L2) ∨ PermissionsArePartiallyCompatible(L1,L2)) ∧ (ProhibitionsAllowAllPermissions(L1,L2) ∨ ProhibitionsAllowSomePermissions(L1,L2)) ∧ (ProhibitionsAllowAllDuties(L1,L2) ∨ ProhibitionsAllowSomeDuties(L1,L2)) ∧ ConformsToShareAlike(L1, L2)$$
