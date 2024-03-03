import { Entity } from "@minecraft/server";

export class Utilities {
    static getClosestEntityFromViewDirection(entity: Entity, distance: number): undefined|Entity {
        const entityRaycastHit_list = entity.getEntitiesFromViewDirection({maxDistance: distance});
        if (entityRaycastHit_list.length === 0) return undefined;
        let entityClosest = undefined;
        let maxDistance = distance;
        entityRaycastHit_list.forEach((entityRaycastHit) => {
            if (entityRaycastHit.distance < maxDistance) {
                maxDistance = entityRaycastHit.distance;
                entityClosest = entityRaycastHit.entity;
            };
        });
        return entityClosest as Entity;
    };
};