using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFoodApp.API.Migrations
{
    public partial class Add_BranchPreference_Trigger_DataSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Modulo.Pickup', '0', TRUE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Modulo.Delivery', '0', TRUE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Modulo.Camarero', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Modulo.Reservas', '0', FALSE, 'bit' FROM ""Branches"";


                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Pickup.Procesador', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Pickup.Efectivo', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Delivery.Procesador', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Delivery.Efectivo', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Camarero.Procesador', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Camarero.Efectivo', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Comision.Reservas.CobroUnitario', '0', TRUE, 'decimal' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Reservas.CobroFijo', '0', TRUE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Pickup.Programar', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Camarero.BotonLlamar', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Reservas.AutoConfirmar', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Pedidos.AutoConfirmar', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Reservas.Tiempo.AutoConfirmar', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Pedidos.Tiempo.AutoConfirmar', '0', FALSE, 'bit' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Reservas.HorarioStandard', '', FALSE, 'string' FROM ""Branches"";

                INSERT INTO ""BranchPreferences"" (""BranchId"", ""PreferenceName"", ""PreferenceValue"", ""SuperAdminOnly"", ""ValueDataType"") 
                    SELECT ""Id"", 'Preferencias.Pedidos.HorarioStandard', '', FALSE, 'string' FROM ""Branches"";
            ");
            migrationBuilder.Sql(@"
            CREATE OR REPLACE FUNCTION insert_branchpreferences() RETURNS TRIGGER AS $$
                BEGIN
                INSERT INTO BranchPreferences (BranchId, PreferenceName, PreferenceValue, SuperAdminOnly, ValueDataType) VALUES
                                        ( NEW.Id, 'Modulo.Pickup','0', TRUE, 'bit'),
                                        ( NEW.Id, 'Modulo.Delivery','0', TRUE, 'bit'),
                                        ( NEW.Id, 'Modulo.Camarero','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Modulo.Reservas','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Comision.Pickup.Procesador','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Comision.Pickup.Efectivo','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Comision.Delivery.Procesador','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Comision.Delivery.Efectivo','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Comision.Camarero.Procesador','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Comision.Camarero.Efectivo','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Comision.Reservas.CobroUnitario','0', TRUE, 'decimal'),
                                        ( NEW.Id, 'Preferencias.Reservas.CobroFijo','0', TRUE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Pickup.Programar','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Camarero.BotonLlamar','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Reservas.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Pedidos.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Reservas.Tiempo.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Pedidos.Tiempo.AutoConfirmar','0', FALSE, 'bit'),
                                        ( NEW.Id, 'Preferencias.Reservas.HorarioStandard','', FALSE, 'string'),
                                        ( NEW.Id, 'Preferencias.Pedidos.HorarioStandard','', FALSE, 'string');
                            
                        RETURN NEW;
                END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER on_insert_branch
            AFTER INSERT ON ""Branches""
                FOR EACH ROW EXECUTE PROCEDURE insert_branchpreferences();
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DROP TRIGGER on_insert_branch ON ""Branches"";
                DROP FUNCTION insert_branchpreferences;
            ");
        }

    }
}

