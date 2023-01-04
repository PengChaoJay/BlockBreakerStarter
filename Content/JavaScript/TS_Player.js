"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts"); //和本节无关，但后面要用到
require("./Base/ObjectExt");
function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}
class TS_Player extends UE.Character {
    FpsCamera;
    EquippedGun;
    GunLocation;
    CanShoot;
    Constructor() {
        let FpsCamera = this.CreateDefaultSubobjectGeneric("FpsCamera", UE.CameraComponent.StaticClass());
        FpsCamera.SetupAttachment(this.CapsuleComponent, "FpsCamera");
        FpsCamera.K2_SetRelativeLocationAndRotation(new UE.Vector(0, 0, 90), undefined, false, (0, puerts_1.$ref)(undefined), false);
        FpsCamera.bUsePawnControlRotation = true;
        this.FpsCamera = FpsCamera;
        this.CanShoot = true;
        this.GunLocation = this.CreateDefaultSubobjectGeneric('GunLocation', UE.SceneComponent.StaticClass());
        this.GunLocation.SetupAttachment(this.FpsCamera, "GunLocation");
        this.GunLocation.K2_SetRelativeLocationAndRotation(new UE.Vector(30, 14, -12), new UE.Rotator(0, 95, 0), false, (0, puerts_1.$ref)(undefined), false);
    }
    ReceiveBeginPlay() {
        let ucls = UE.Class.Load("/Game/Blueprints/TypeScript/TS_Rifle.TS_Rifle_C");
        this.EquippedGun = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(this, ucls, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, this);
        UE.GameplayStatics.FinishSpawningActor(this.EquippedGun, undefined);
        this.EquippedGun.K2_AttachToComponent(this.GunLocation, undefined, UE.EAttachmentRule.SnapToTarget, UE.EAttachmentRule.SnapToTarget, UE.EAttachmentRule.SnapToTarget, true);
    }
    //@no-blueprint
    async AShoot(axisValue) {
        if (axisValue == 1 && this.CanShoot) {
            let cameraLocation = this.FpsCamera.K2_GetComponentLocation();
            let endLocation = cameraLocation.op_Addition(this.FpsCamera.GetForwardVector().op_Multiply(this.EquippedGun.MaxBulletDistance));
            this.EquippedGun.Shoot(cameraLocation, endLocation);
            this.CanShoot = false;
            await delay(this.EquippedGun.FireRate * 1000);
            this.CanShoot = true;
        }
    }
    // 射击
    Shoot(axisValue) {
        this.AShoot(axisValue);
    }
    //角色移动
    MoveForward(axisValue) {
        this.AddMovementInput(this.GetActorForwardVector(), axisValue, false);
    }
    MoveRight(axisValue) {
        this.AddMovementInput(this.GetActorRightVector(), axisValue, false);
    }
    LookHorizontal(axisValue) {
        this.AddControllerYawInput(axisValue);
    }
    LookVertical(axisValue) {
        this.AddControllerPitchInput(axisValue * -1);
    }
    Jump1() {
        this.Jump();
    }
}
exports.default = TS_Player;
//# sourceMappingURL=TS_Player.js.map